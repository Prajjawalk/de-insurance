import { useEffect, useState, type FC } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";
import type { Abi } from "viem";
import {
  BaseError,
  useAccount,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import erc20Abi from "../../../artifacts/USDC.sol/USDC.json";
import vaultAbi from "../../../artifacts/Vault.sol/Vault.json";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  address: `0x${string}`;
  underlyingAssetAddress: `0x${string}`;
}

export const Deposit: FC<Props> = (props) => {
  const account = useAccount();
  const [amount, setAmount] = useState<string>("0");
  const [approveButton, setApproveButton] = useState<boolean>();

  const { data, error, isPending } = useReadContracts({
    contracts: [
      {
        abi: vaultAbi.abi,
        address: props.address,
        args: [amount],
        functionName: "convertToShares",
      },
      {
        abi: erc20Abi.abi,
        address: props.underlyingAssetAddress,
        args: [account.address, props.address],
        functionName: "allowance",
      },
      {
        abi: erc20Abi.abi,
        address: props.underlyingAssetAddress,
        functionName: "decimals",
      },
    ],
  });

  useEffect(() => {
    if (data && BigInt(String(data?.[1].result)) < BigInt(amount)) {
      setApproveButton(true);
    }
  }, [data, amount]);

  const approve = useWriteContract();
  const deposit = useWriteContract();

  const approveToken = () => {
    approve.writeContract({
      abi: erc20Abi.abi as Abi,
      address: props.underlyingAssetAddress,
      functionName: "approve",
      args: [props.address, BigInt(amount)],
    });
  };

  const depositToken = () => {
    deposit.writeContract({
      abi: vaultAbi.abi as Abi,
      address: props.address,
      functionName: "_deposit",
      args: [BigInt(amount)],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: deposit.data as `0x${string}`,
  });

  const approveLoader = useWaitForTransactionReceipt({
    hash: approve.data as `0x${string}`,
  });

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Deposit To Pool</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <Flex flexDir={"column"} gap={"5"}>
            <Flex>Enter amount to deposit</Flex>
            <Flex fontSize={"small"}>{`Decimals: ${data?.[2].result}`}</Flex>
            <Input
              placeholder="Amount"
              size="md"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Flex>Shares:</Flex>
            <Flex>
              {(isPending ? "loading" : error ? error.message : String(data[0].result)) as string}
            </Flex>
            {approve.data && <Flex>Transaction Hash: {deposit.data}</Flex>}
            {approveLoader.isLoading && <Flex>Waiting for confirmation...</Flex>}
            {approveLoader.isSuccess && <Flex>Approval confirmed.</Flex>}
            {approve.error && (
              <Flex>Error: {(approve.error as BaseError).details || approve.error.message}</Flex>
            )}
            {deposit.data && <Flex>Transaction Hash: {deposit.data}</Flex>}
            {isConfirming && <Flex>Waiting for confirmation...</Flex>}
            {isConfirmed && <Flex>Transaction confirmed.</Flex>}
            {deposit.error && (
              <Flex>Error: {(deposit.error as BaseError).details || deposit.error.message}</Flex>
            )}
          </Flex>
        </ModalBody>

        <ModalFooter>
          {approveButton ? (
            <Button
              colorScheme="blue"
              mr={3}
              disabled={approve.isPending}
              onClick={() => approveToken()}
            >
              {approve.isPending ? "Confirming..." : "Approve"}
            </Button>
          ) : null}
          <Button
            colorScheme="blue"
            mr={3}
            disabled={deposit.isPending}
            onClick={() => depositToken()}
          >
            {deposit.isPending ? "Confirming..." : "Deposit"}
          </Button>
          <Button variant="ghost" onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
