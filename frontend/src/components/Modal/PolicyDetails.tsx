import type { FC } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Heading,
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

export const PolicyDetails: FC<Props> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Protected Resources</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <Heading as="h3" fontSize={"1rem"} mb={10} className="text-shadow">
            Bridges
          </Heading>
          <Flex className={styles.content}>
            <TableContainer width="90%" overflowY="auto">
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Chain</Th>
                    <Th>Dept Token</Th>
                    <Th>Address</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Wormhole</Td>
                    <Td>Solana</Td>
                    <Td>wETH</Td>
                    <Td>0x...</Td>
                  </Tr>
                  <Tr>
                    <Td>Wormhole</Td>
                    <Td>Solana</Td>
                    <Td>wETH</Td>
                    <Td>0x...</Td>
                  </Tr>
                  <Tr>
                    <Td>Wormhole</Td>
                    <Td>Solana</Td>
                    <Td>wETH</Td>
                    <Td>0x...</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
          <Heading as="h3" fontSize={"1rem"} mb={10} className="text-shadow">
            Dexes
          </Heading>
          <Flex className={styles.content}>
            <TableContainer width="90%" overflowY="auto">
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Chain</Th>
                    <Th>Pool</Th>
                    <Th>Token</Th>
                    <Th>Address</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Uniswap</Td>
                    <Td>Ethereum</Td>
                    <Td>USDC/ETH</Td>
                    <Td>ETH</Td>
                    <Td>0x...</Td>
                  </Tr>
                  <Tr>
                    <Td>Uniswap</Td>
                    <Td>Ethereum</Td>
                    <Td>USDC/ETH</Td>
                    <Td>ETH</Td>
                    <Td>0x...</Td>
                  </Tr>
                  <Tr>
                    <Td>Uniswap</Td>
                    <Td>Ethereum</Td>
                    <Td>USDC/ETH</Td>
                    <Td>ETH</Td>
                    <Td>0x...</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
          <Heading as="h3" fontSize={"1rem"} mb={10} className="text-shadow">
            Liquidity Pools
          </Heading>
          <Flex className={styles.content}>
            <TableContainer width="90%" overflowY="auto">
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Chain</Th>
                    <Th>Pool</Th>
                    <Th>Token</Th>
                    <Th>Address</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Lido</Td>
                    <Td>Ethereum</Td>
                    <Td>ETH/stETH</Td>
                    <Td>stETH</Td>
                    <Td>0x...</Td>
                  </Tr>
                  <Tr>
                    <Td>Lido</Td>
                    <Td>Ethereum</Td>
                    <Td>ETH/stETH</Td>
                    <Td>stETH</Td>
                    <Td>0x...</Td>
                  </Tr>
                  <Tr>
                    <Td>Lido</Td>
                    <Td>Ethereum</Td>
                    <Td>ETH/stETH</Td>
                    <Td>stETH</Td>
                    <Td>0x...</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
