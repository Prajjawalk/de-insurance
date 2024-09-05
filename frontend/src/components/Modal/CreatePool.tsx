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
import { BaseError, useChainId, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import poolfactoryAbi from "../../../artifacts/PoolFactory.sol/PoolFactory.json";
import { broadCastDetails } from "@/broadcastDetails";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePool: FC<Props> = (props) => {
  const [asset, setAsset] = useState<string>();
  const [name, setName] = useState<string>();
  const [symbol, setSymbol] = useState<string>();

  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const chainId = useChainId();

  const createPool = () => {
    writeContract({
      abi: poolfactoryAbi.abi,
      address: broadCastDetails.PoolFactory[
        chainId as unknown as keyof typeof broadCastDetails.PoolFactory
      ] as `0x${string}`,
      functionName: "createNewPool",
      args: [asset, name, symbol],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Insurance Pool</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <Flex flexDir={"column"} gap={"5"}>
            <Flex>Enter underlying asset</Flex>
            <Input
              placeholder="0x"
              size="md"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
            />
            <Flex>Enter pool token name</Flex>
            <Input
              placeholder="Name"
              size="md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Flex>Enter pool token symbol</Flex>
            <Input
              placeholder="Symbol"
              size="md"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />

            {hash && <Flex>Transaction Hash: {hash}</Flex>}
            {isConfirming && <Flex>Waiting for confirmation...</Flex>}
            {isConfirmed && <Flex>Transaction confirmed.</Flex>}
            {error && <Flex>Error: {(error as BaseError).shortMessage || error.message}</Flex>}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" disabled={isPending} mr={3} onClick={() => createPool()}>
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
