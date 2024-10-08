import { useEffect, useState, type FC } from "react";

import { Tr, Td, Flex, Button, useDisclosure } from "@chakra-ui/react";
import { BaseError, useAccount, useReadContracts } from "wagmi";

import vaultAbi from "../../../artifacts/Vault.sol/Vault.json";
import { Deposit } from "../Modal/Deposit";
import { Withdraw } from "../Modal/Withdraw";

interface Props {
  address: `0x${string}`;
  setpage: (name: string) => void;
  setPool: (name: string) => void;
}

export const PoolDetails: FC<Props> = (props) => {
  const { address, chain } = useAccount();
  const deposit = useDisclosure();
  const withdraw = useDisclosure();
  const [poolOwner, setPoolOwner] = useState<string>();

  const poolData = useReadContracts({
    contracts: [
      {
        abi: vaultAbi.abi,
        address: props.address,
        functionName: "asset",
      },
      {
        abi: vaultAbi.abi,
        address: props.address,
        functionName: "totalAssets",
      },
      {
        abi: vaultAbi.abi,
        address: props.address,
        functionName: "symbol",
      },
      {
        abi: vaultAbi.abi,
        address: props.address,
        functionName: "underlyingTokenSymbol",
      },
      {
        abi: vaultAbi.abi,
        address: props.address,
        functionName: "owner",
      },
    ],
  });

  useEffect(() => {
    if (poolData.isSuccess && poolData.data[4].result) {
      setPoolOwner(String(poolData.data[4].result));
    }
  }, [poolData.data, poolData.isSuccess]);

  if (poolData.isPending) return <div>Loading...</div>;

  if (poolData.error)
    return <div>Error: {(poolData.error as BaseError).shortMessage || poolData.error.message}</div>;

  const [asset, totalAssets, symbol, underlyingTokenSymbol] = poolData.data || [];

  return (
    <>
      <Deposit
        isOpen={deposit.isOpen}
        onClose={deposit.onClose}
        address={props.address}
        underlyingAssetAddress={asset.result as `0x${string}`}
      />
      <Withdraw
        isOpen={withdraw.isOpen}
        onClose={withdraw.onClose}
        address={props.address}
        underlyingAssetAddress={asset.result as `0x${string}`}
      />
      <Tr>
        <Td>
          <Flex gap={"2"}>
            {/* <img width={"20"} height={"20"} src="usdc_logo.png" alt="USDC" /> */}
            {((symbol?.result as string) + "/" + underlyingTokenSymbol?.result) as string}
          </Flex>
        </Td>
        <Td>{chain?.name}</Td>
        <Td>{String(totalAssets.result) ?? "0"}</Td>
        <Td>5.7%</Td>
        <Td>5.99%</Td>
        <Td>6.5%</Td>
        <Td>
          <Button onClick={deposit.onOpen}>Deposit</Button>
        </Td>
        <Td>
          <Button onClick={withdraw.onOpen}>Withdraw</Button>
        </Td>
        {poolOwner == address ? (
          <Td>
            <Button
              onClick={() => {
                props.setpage("manage");
                props.setPool(props.address as string);
              }}
            >
              Manage
            </Button>
          </Td>
        ) : null}
      </Tr>
    </>
  );
};
