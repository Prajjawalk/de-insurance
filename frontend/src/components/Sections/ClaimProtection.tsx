import type { FC } from "react";

import {
  Box,
  Heading,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useColorMode,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import styles from "@/styles/mainPane.module.css";
import { PolicyClaim } from "../Modal/PolicyClaim";

export const ClaimProtection: FC = () => {
  const { colorMode } = useColorMode();
  const claim = useDisclosure();
  return (
    <Box
      className={styles.container}
      border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
    >
      <Heading as="h2" fontSize={"2rem"} mb={10} className="text-shadow">
        Policy Portfolio
      </Heading>
      <PolicyClaim isOpen={claim.isOpen} onClose={claim.onClose} />
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
                <Td>Unclaimed</Td>
                <Td>30 Days</Td>
                <Td>10000</Td>
                <Td>
                  <Button onClick={claim.onOpen}>Claim</Button>
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
                <Td>Unclaimed</Td>
                <Td>30 Days</Td>
                <Td>10000</Td>
                <Td>
                  <Button onClick={claim.onOpen}>Claim</Button>
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
                <Td>Unclaimed</Td>
                <Td>30 Days</Td>
                <Td>10000</Td>
                <Td>
                  <Button onClick={claim.onOpen}>Claim</Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Box>
  );
};
