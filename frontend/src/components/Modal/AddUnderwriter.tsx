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
import { BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import vaultAbi from "../../../artifacts/Vault.sol/Vault.json";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  poolAddress: string;
}

export const AddUnderwriter: FC<Props> = (props) => {
  const [underwriter, setUnderwriter] = useState<`0x${string}`>();
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const addUnderwriter = () => {
    writeContract({
      abi: vaultAbi.abi,
      address: props.poolAddress as `0x${string}`,
      functionName: "updateUnderwriter",
      args: [underwriter],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Underwriter</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <Flex flexDir={"column"} gap={"5"}>
            <Flex>Enter underwriter address</Flex>
            <Input
              placeholder="0x..."
              size="md"
              value={underwriter}
              onChange={(e) => setUnderwriter(e.target.value as `0x${string}`)}
            />
            {hash && <Flex>Transaction Hash: {hash}</Flex>}
            {isConfirming && <Flex>Waiting for confirmation...</Flex>}
            {isConfirmed && <Flex>Transaction confirmed.</Flex>}
            {error && <Flex>Error: {(error as BaseError).shortMessage || error.message}</Flex>}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} disabled={isPending} onClick={() => addUnderwriter()}>
            {isPending ? "Confirming..." : "Add"}
          </Button>
          <Button variant="ghost" onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
