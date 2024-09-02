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

import { PolicyCheckout } from "../Modal/PolicyCheckout";
import { PolicyDetails } from "../Modal/PolicyDetails";
import styles from "@/styles/mainPane.module.css";

export const BuyProtection: FC = () => {
  const { colorMode } = useColorMode();
  const policyDetails = useDisclosure();
  const policyBuy = useDisclosure();

  return (
    <Box
      className={styles.container}
      border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
    >
      <Heading as="h2" fontSize={"2rem"} mb={10} className="text-shadow">
        Insurance Policies
      </Heading>
      <PolicyDetails isOpen={policyDetails.isOpen} onClose={policyDetails.onClose} />
      <PolicyCheckout isOpen={policyBuy.isOpen} onClose={policyBuy.onClose} />
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
                <Td>100</Td>
                <Td>30 Days</Td>
                <Td>10000</Td>
                <Td>
                  <Button onClick={policyDetails.onOpen}>Details</Button>
                </Td>
                <Td>
                  <Button onClick={policyBuy.onOpen}>Buy</Button>
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
                <Td>100</Td>
                <Td>30 Days</Td>
                <Td>10000</Td>
                <Td>
                  <Button onClick={policyDetails.onOpen}>Details</Button>
                </Td>
                <Td>
                  <Button onClick={policyBuy.onOpen}>Buy</Button>
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
                <Td>100</Td>
                <Td>30 Days</Td>
                <Td>10000</Td>
                <Td>
                  <Button onClick={policyDetails.onOpen}>Details</Button>
                </Td>
                <Td>
                  <Button onClick={policyBuy.onOpen}>Buy</Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Box>
  );
};
