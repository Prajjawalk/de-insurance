import type { FC } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

import styles from "@/styles/mainPane.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PolicyCheckout: FC<Props> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Purchase Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <Flex flexDir={"column"} gap={"5"}>
            <Flex>{"Price: 100 USDC"}</Flex>
            <Flex>{"Validity: 30 Days"}</Flex>
            <Flex>{"Underwriters"}</Flex>
            <Flex className={styles.content}>
              <TableContainer width="90%" overflowY="auto">
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Address</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Jarvis</Td>
                      <Td>jarvis.eth</Td>
                    </Tr>
                    <Tr>
                      <Td>Gemini</Td>
                      <Td>0x...</Td>
                    </Tr>
                    <Tr>
                      <Td>Gemini</Td>
                      <Td>0x...</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
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
