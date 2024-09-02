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

export const AddUnderwriter: FC<Props> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Underwriter</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <Flex flexDir={"column"} gap={"5"}>
            <Flex>Enter underwriter address</Flex>
            <Input placeholder="0x..." size="md" />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Add
          </Button>
          <Button variant="ghost" onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
