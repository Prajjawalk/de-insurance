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
  Textarea,
} from "@chakra-ui/react";
import { BaseError, toHex } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import vaultAbi from "../../../artifacts/Vault.sol/Vault.json";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  address: string;
}

export const CreatePolicy: FC<Props> = (props) => {
  const [validity, setValidity] = useState<string>();
  const [maxClaim, setMaxClaim] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [tnc, setTnc] = useState<string>();
  const [minUnderwriters, setMinUnderwriters] = useState<string>();

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const createPolicy = () => {
    writeContract({
      abi: vaultAbi.abi,
      address: props.address as `0x${string}`,
      functionName: "createPolicy",
      args: [
        toHex(tnc as string),
        BigInt(validity as string) * 86400n,
        maxClaim,
        price,
        minUnderwriters,
      ],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} scrollBehavior={"inside"} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Policy</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <Flex flexDir={"column"} gap={"5"}>
            <Flex>Enter Price</Flex>
            <Input
              placeholder="Price"
              size="md"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Flex>Enter Max Claim</Flex>
            <Input
              placeholder="Amount"
              size="md"
              value={maxClaim}
              onChange={(e) => setMaxClaim(e.target.value)}
            />
            <Flex>Validity Period (Days)</Flex>
            <Input
              placeholder="Validity"
              size="md"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
            />
            <Flex>Minimum Underwriters</Flex>
            <Input
              placeholder="Underwriters"
              size="md"
              value={minUnderwriters}
              onChange={(e) => setMinUnderwriters(e.target.value)}
            />
            <Flex>Policy Termsheet</Flex>
            <Textarea value={tnc} onChange={(e) => setTnc(e.target.value)} />
            {hash && <Flex>Transaction Hash: {hash}</Flex>}
            {isConfirming && <Flex>Waiting for confirmation...</Flex>}
            {isConfirmed && <Flex>Transaction confirmed.</Flex>}
            {error && <Flex>Error: {(error as BaseError).shortMessage || error.message}</Flex>}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} disabled={isPending} onClick={() => createPolicy()}>
            {isPending ? "Confirming..." : "Create"}
          </Button>
          <Button variant="ghost" onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
