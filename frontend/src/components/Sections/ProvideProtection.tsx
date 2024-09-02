import type { FC } from "react";

import {
  Box,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";

import { Deposit } from "../Modal/Deposit";
import { Withdraw } from "../Modal/Withdraw";
import styles from "@/styles/mainPane.module.css";

export const ProvideProtection: FC = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deposit = useDisclosure();
  const withdraw = useDisclosure();
  return (
    <Box
      className={styles.container}
      border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
    >
      <Heading as="h2" fontSize={"2rem"} mb={10} className="text-shadow">
        Insurance pools
      </Heading>
      <Flex justify={"right"} width={"90%"}>
        <Button colorScheme="blue" size="md" onClick={onOpen}>
          Create Pool
        </Button>
      </Flex>
      <Deposit isOpen={deposit.isOpen} onClose={deposit.onClose} />
      <Withdraw isOpen={withdraw.isOpen} onClose={withdraw.onClose} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>This is modal body</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex className={styles.content}>
        <TableContainer width="90%">
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Token</Th>
                <Th>Chain</Th>
                <Th>TVL</Th>
                <Th>24h APY</Th>
                <Th>7D APY</Th>
                <Th>30D APY</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Flex gap={"2"}>
                    <img width={"20"} height={"20"} src="usdc_logo.png" alt="USDC" />
                    {"USDC"}
                  </Flex>
                </Td>
                <Td>Ethereum</Td>
                <Td>$1.5B</Td>
                <Td>5.7%</Td>
                <Td>5.99%</Td>
                <Td>6.5%</Td>
                <Td>
                  <Button onClick={deposit.onOpen}>Deposit</Button>
                </Td>
                <Td>
                  <Button onClick={withdraw.onOpen}>Withdraw</Button>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Flex gap={"2"}>
                    <img width={"20"} height={"20"} src="usdc_logo.png" alt="USDC" />
                    {"USDC"}
                  </Flex>
                </Td>
                <Td>Ethereum</Td>
                <Td>$1.5B</Td>
                <Td>5.7%</Td>
                <Td>5.99%</Td>
                <Td>6.5%</Td>
                <Td>
                  <Button onClick={deposit.onOpen}>Deposit</Button>
                </Td>
                <Td>
                  <Button onClick={withdraw.onOpen}>Withdraw</Button>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Flex gap={"2"}>
                    <img width={"20"} height={"20"} src="usdc_logo.png" alt="USDC" />
                    {"USDC"}
                  </Flex>
                </Td>
                <Td>Ethereum</Td>
                <Td>$1.5B</Td>
                <Td>5.7%</Td>
                <Td>5.99%</Td>
                <Td>6.5%</Td>
                <Td>
                  <Button onClick={deposit.onOpen}>Deposit</Button>
                </Td>
                <Td>
                  <Button onClick={withdraw.onOpen}>Withdraw</Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Box>
  );
};
