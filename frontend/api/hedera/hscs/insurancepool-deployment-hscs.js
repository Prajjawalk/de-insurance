#!/usr/bin/env node

import dotenv from 'dotenv';
import {
    createWalletClient,
    http,
    publicActions,
 } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { hederaTestnet } from 'viem/chains';

import poolAbi from "../../../artifacts/PoolFactory.sol/PoolFactory.json"

const logger = await createLogger({
    scriptId: 'tokenHscs',
    scriptCategory: 'task',
});

async function scriptTokenHscs() {
    dotenv.config();
    logger.log('Read .env file');

    // Initialise RPC connection via viem
    // Ref: https://github.com/hedera-dev/hedera-code-snippets/blob/main/connect-viem/connect.js
    /*
    Set up a JSON-RPC endpoint for this project to connect to Hedera Testnet.
    Ref: https://docs.hedera.com/hedera/tutorials/more-tutorials/json-rpc-connections/

    Then set that as the value of `RPC_URL` in the `.env` file.
    */
    const rpcUrlHederatestnet = process.env.RPC_URL;
    if (!rpcUrlHederatestnet || !rpcUrlHederatestnet.startsWith('http')) {
        throw new Error(
            'Missing or invalid value in RPC_URL env var',
        );
    }
    const operatorEvmAddressStr = process.env.OPERATOR_ACCOUNT_EVM_ADDRESS;
    const operatorKeyStr = process.env.OPERATOR_ACCOUNT_PRIVATE_KEY;
    const account1EvmAddress = process.env.ACCOUNT_1_EVM_ADDRESS;
    const account1KeyStr = process.env.ACCOUNT_1_PRIVATE_KEY;
    if (!operatorEvmAddressStr || !operatorKeyStr ||
        !account1EvmAddress || !account1KeyStr ) {
        throw new Error('Must set OPERATOR_ACCOUNT_ID, OPERATOR_ACCOUNT_PRIVATE_KEY, ACCOUNT_1_EVM_ADDRESS, and ACCOUNT_1_PRIVATE_KEY environment variables');
    }
    const operatorAccount = privateKeyToAccount(operatorKeyStr);
    const client = createWalletClient({
        account: operatorAccount,
        chain: hederaTestnet,
        transport: http(rpcUrlHederatestnet, {
          batch: false,
          timeout: 60_000,
          retryCount: 5,
          retryDelay: 500,
        }),
    }).extend(publicActions);
    logger.log('Using account:', operatorEvmAddressStr);
    logger.log('Using RPC endpoint:', rpcUrlHederatestnet);

    // check JSON-RPC relay
    await logger.logSection('Checking JSON-RPC endpoint liveness');
    const [blockNumber, balance] = await Promise.all([
        client.getBlockNumber(),
        client.getBalance({
            address: operatorEvmAddressStr,
        }),
    ]);
    logger.log('block number', blockNumber);
    logger.log('balance', balance);

    // EVM deployment transaction via viem
    await logger.logSection('Submit EVM transaction over RPC to deploy bytecode');
    const deployTxHash = await client.deployContract({
        abi: myTokenAbi,
        bytecode: myTokenEvmBytecode,
        // constructor(string memory _symbol, string memory _name)
        args: [
            logger.scriptId.toUpperCase(),
            `${logger.scriptId} coin`,
        ],
        account: operatorAccount,
    });
    logger.log('Deployment transaction hash:', deployTxHash);
    const deployTxHashscanUrl = `https://hashscan.io/testnet/transaction/${deployTxHash}`;
    logger.log(
        'Deployment transaction Hashscan URL:\n',
        ...logger.applyAnsi('URL', deployTxHashscanUrl),
    );

    const deployTxReceipt = await client.getTransactionReceipt({
        hash: deployTxHash,
    });
    logger.log('Deployment transaction receipt status:', deployTxReceipt.status);
    const deployAddress = deployTxReceipt.contractAddress;
    logger.log('Deployment transaction address:', deployAddress);
    const deployAddressHashscanUrl = `https://hashscan.io/testnet/contract/${deployAddress}`;
    logger.log(
        'Deployment address Hashscan URL:\n',
        ...logger.applyAnsi('URL', deployAddressHashscanUrl),
    );

    // EVM transfer transaction via viem
    await logger.logSection('Submit EVM transaction over RPC to transfer token balance');
    // function transfer(address to, uint256 amount) external returns (bool);
    const transferTxHash = await client.writeContract({
        address: deployAddress,
        abi: poolAbi,
        functionName: 'transfer',
        args: [
            account1EvmAddress, // address to
            100n, // uint256 amount
        ],
        account: operatorAccount,
    });
    logger.log('Transfer transaction hash:', transferTxHash);
    const transferTxHashscanUrl = `https://hashscan.io/testnet/transaction/${transferTxHash}`;
    logger.log(
        'Transfer transaction Hashscan URL:\n',
        ...logger.applyAnsi('URL', transferTxHashscanUrl),
    );
    const transferTxReceipt = await client.getTransactionReceipt({
        hash: transferTxHash,
    });
    logger.log('Transfer transaction receipt status:', transferTxReceipt.status);

    // EVM balance query via viem
    await logger.logSection('Submit EVM request over RPC to query token balance');
    // function balanceOf(address account) external view returns (uint256);
    const queryResult = await client.readContract({
        address: deployAddress,
        abi: myTokenAbi,
        functionName: 'balanceOf',
        args: [account1EvmAddress],
    });
    logger.log('Balance of query result:', queryResult);

    logger.logComplete('tokenHscs task complete!');
}

scriptTokenHscs().catch((ex) => {
    logger ? logger.logError(ex) : console.error(ex);
});