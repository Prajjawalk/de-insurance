import type { FC } from "react";

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

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Withdraw: FC<Props> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Withdraw from Pool</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <Flex flexDir={"column"} gap={"5"}>
            <Flex>Enter shares</Flex>
            <Input placeholder="Amount" size="md" />
            <Flex>Withdraw Amount:</Flex>
            <Flex>1000</Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
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
