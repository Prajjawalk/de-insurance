// components/MainPane.tsx
import { useState, type FC } from "react";

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";

import {
  Status,
  Address,
  Chain,
  Balance,
  BlockNumber,
  TransferNative,
  SignMessage,
} from "./components";
import styles from "@/styles/mainPane.module.css";

const MainPane: FC = () => {
  const { isConnected } = useAccount();
  const { colorMode } = useColorMode();
  const [page, setPage] = useState("buy");

  return (
    <Flex alignItems="start" gap="1rem" margin="auto">
      <Flex flexDir="column" gap="1rem" marginTop="0" alignContent="start">
        <Button colorScheme="blue" size="lg" onClick={() => setPage("buy")}>
          Buy Protection
        </Button>
        <Button colorScheme="blue" size="lg" onClick={() => setPage("provide")}>
          Provide Protection
        </Button>
        <Button colorScheme="blue" size="lg" onClick={() => setPage("claim")}>
          Claim Insurance
        </Button>
      </Flex>
      <Flex className={styles.content}>
        {page == "provide" ? (
          <Box
            className={styles.container}
            border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
          >
            <Heading as="h2" fontSize={"2rem"} mb={10} className="text-shadow">
              Insurance pools
            </Heading>
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
                      <Td>USDC</Td>
                      <Td>Ethereum</Td>
                      <Td>$1.5B</Td>
                      <Td>5.7%</Td>
                      <Td>5.99%</Td>
                      <Td>6.5%</Td>
                      <Td>
                        <Button>Deposit</Button>
                      </Td>
                      <Td>
                        <Button>Withdraw</Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>USDC</Td>
                      <Td>Ethereum</Td>
                      <Td>$1.5B</Td>
                      <Td>5.7%</Td>
                      <Td>5.99%</Td>
                      <Td>6.5%</Td>
                      <Td>
                        <Button>Deposit</Button>
                      </Td>
                      <Td>
                        <Button>Withdraw</Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>USDC</Td>
                      <Td>Ethereum</Td>
                      <Td>$1.5B</Td>
                      <Td>5.7%</Td>
                      <Td>5.99%</Td>
                      <Td>6.5%</Td>
                      <Td>
                        <Button>Deposit</Button>
                      </Td>
                      <Td>
                        <Button>Withdraw</Button>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Box>
        ) : page == "buy" ? (
          <Box
            className={styles.container}
            border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
          >
            <Heading as="h2" fontSize={"2rem"} mb={10} className="text-shadow">
              Insurance Policies
            </Heading>
            <Flex className={styles.content}>
              <TableContainer width="90%">
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>Token</Th>
                      <Th>Chain</Th>
                      <Th>Price</Th>
                      <Th>Validity</Th>
                      <Th>Max Claim</Th>
                      <Th>Details</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>USDC</Td>
                      <Td>Ethereum</Td>
                      <Td>100</Td>
                      <Td>30 Days</Td>
                      <Td>10000</Td>
                      <Td>Link</Td>
                    </Tr>
                    <Tr>
                      <Td>USDC</Td>
                      <Td>Ethereum</Td>
                      <Td>100</Td>
                      <Td>30 Days</Td>
                      <Td>10000</Td>
                      <Td>Link</Td>
                    </Tr>
                    <Tr>
                      <Td>USDC</Td>
                      <Td>Ethereum</Td>
                      <Td>100</Td>
                      <Td>30 Days</Td>
                      <Td>10000</Td>
                      <Td>Link</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Box>
        ) : (
          <Box
            className={styles.container}
            border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
          >
            <Heading as="h2" fontSize={"2rem"} mb={10} className="text-shadow">
              Policy Portfolio
            </Heading>
            <Flex className={styles.content}>
              <TableContainer width="90%">
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>Token</Th>
                      <Th>Chain</Th>
                      <Th>Status</Th>
                      <Th>Validity</Th>
                      <Th>Max Claim</Th>
                      <Th>Details</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>USDC</Td>
                      <Td>Ethereum</Td>
                      <Td>Active</Td>
                      <Td>30 Days</Td>
                      <Td>10000</Td>
                      <Td>Link</Td>
                    </Tr>
                    <Tr>
                      <Td>USDC</Td>
                      <Td>Ethereum</Td>
                      <Td>Active</Td>
                      <Td>30 Days</Td>
                      <Td>10000</Td>
                      <Td>Link</Td>
                    </Tr>
                    <Tr>
                      <Td>USDC</Td>
                      <Td>Ethereum</Td>
                      <Td>Active</Td>
                      <Td>30 Days</Td>
                      <Td>10000</Td>
                      <Td>Link</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default MainPane;
