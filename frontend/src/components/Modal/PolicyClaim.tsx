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
  Textarea,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PolicyClaim: FC<Props> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Claim Insurance</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <Flex flexDir={"column"} gap={"5"}>
            <Flex>Enter claim amount</Flex>
            <Input placeholder="Amount" size="md" />
            <Flex>Enter claim details</Flex>
            <Textarea placeholder="Details" size="lg" />
            <Flex>Enter supporting links</Flex>
            <Input placeholder="Links" size="md" />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Claim
          </Button>
          <Button variant="ghost" onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
