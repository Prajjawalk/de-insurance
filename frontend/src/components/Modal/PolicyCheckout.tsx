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
  poolAddress: `0x${string}`;
  policyId: string;
  price: bigint;
  validity: bigint;
  minUnderwriters: bigint;
  underlyingToken: string;
  underlyingTokenAddress: `0x${string}`;
}

export const PolicyCheckout: FC<Props> = (props) => {
  const account = useAccount();
  const [approveButton, setApproveButton] = useState<boolean>();

  const { data, error } = useReadContracts({
    contracts: [
      {
        abi: erc20Abi.abi,
        address: props.underlyingTokenAddress,
        args: [account.address, props.poolAddress],
        functionName: "allowance",
      },
    ],
  });
  const approve = useWriteContract();
  const checkout = useWriteContract();

  useEffect(() => {
    if (data && BigInt(String(data?.[0].result)) < props.price) {
      setApproveButton(true);
    }
  }, [data, props.price]);

  const approveToken = () => {
    approve.writeContract({
      abi: erc20Abi.abi as Abi,
      address: props.underlyingTokenAddress,
      functionName: "approve",
      args: [props.poolAddress, props.price],
    });
  };

  const checkoutPolicy = () => {
    checkout.writeContract({
      abi: vaultAbi.abi,
      address: props.poolAddress as `0x${string}`,
      functionName: "purchasePolicy",
      args: [BigInt(props.policyId)],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: checkout.data,
  });
  const approveLoader = useWaitForTransactionReceipt({
    hash: approve.data as `0x${string}`,
  });
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Purchase Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <Flex flexDir={"column"} gap={"5"}>
            <Flex>
              Price: {String(props.price)} {props.underlyingToken}
            </Flex>
            <Flex>Validity: {String(props.validity / 86400n)} Days</Flex>
            <Flex>Min Underwriters: {String(props.minUnderwriters)}</Flex>
            {approve.data && <Flex>Approval Transaction Hash: {approve.data}</Flex>}
            {approveLoader.isLoading && <Flex>Waiting for confirmation...</Flex>}
            {approveLoader.isSuccess && <Flex>Approval confirmed.</Flex>}
            {approve.error && (
              <Flex>Error: {(approve.error as BaseError).details || approve.error.message}</Flex>
            )}
            {checkout.data && <Flex>Transaction Hash: {checkout.data}</Flex>}
            {isConfirming && <Flex>Waiting for confirmation...</Flex>}
            {isConfirmed && <Flex>Transaction confirmed.</Flex>}
            {error && <Flex>Error: {(error as BaseError).shortMessage || error.message}</Flex>}
          </Flex>
        </ModalBody>

        <ModalFooter>
          {approveButton ? (
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={approve.isPending}
              loadingText={"Confirming"}
              onClick={() => approveToken()}
            >
              {approve.isPending ? "Confirming..." : "Approve"}
            </Button>
          ) : null}
          <Button
            colorScheme="blue"
            mr={3}
            isLoading={checkout.isPending}
            loadingText={"Confirming"}
            onClick={() => checkoutPolicy()}
          >
            Buy
          </Button>
          <Button variant="ghost" onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
