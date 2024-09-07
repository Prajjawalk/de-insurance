import { useState, type FC } from "react";

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
import type { Abi, BaseError } from "viem";
import {
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

export const Withdraw: FC<Props> = (props) => {
  const account = useAccount();
  const [amount, setAmount] = useState<string>("0");
  const { data, error, isPending } = useReadContracts({
    contracts: [
      {
        abi: vaultAbi.abi,
        address: props.address,
        args: [amount],
        functionName: "convertToAssets",
      },
      {
        abi: erc20Abi.abi,
        address: props.underlyingAssetAddress,
        functionName: "decimals",
      },
    ],
  });

  const withdraw = useWriteContract();

  const withdrawToken = () => {
    withdraw.writeContract({
      abi: vaultAbi.abi as Abi,
      address: props.address,
      functionName: "_withdraw",
      args: [BigInt(amount), account.address],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: withdraw.data as `0x${string}`,
  });

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Withdraw from Pool</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <Flex flexDir={"column"} gap={"5"}>
            <Flex>Enter shares</Flex>
            <Input
              placeholder="Amount"
              size="md"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Flex>Withdraw Amount:</Flex>

            <Flex>
              {(isPending ? "loading" : error ? error.message : String(data[0].result)) as string}
            </Flex>
            {withdraw.data && <Flex>Transaction Hash: {withdraw.data}</Flex>}
            {isConfirming && <Flex>Waiting for confirmation...</Flex>}
            {isConfirmed && <Flex>Transaction confirmed.</Flex>}
            {withdraw.error && (
              <Flex>Error: {(withdraw.error as BaseError).details || withdraw.error.message}</Flex>
            )}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => withdrawToken()}
            isLoading={withdraw.isPending}
            loadingText={"Confirming"}
          >
            Withdraw
          </Button>
          <Button variant="ghost" onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
