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

import { AddUnderwriter } from "../Modal/AddUnderwriter";
import { CreatePolicy } from "../Modal/CreatePolicy";
import { PolicyDetails } from "../Modal/PolicyDetails";
import styles from "@/styles/mainPane.module.css";

export const ManagePolicies: FC = () => {
  const { colorMode } = useColorMode();
  const createPolicy = useDisclosure();
  const policyDetails = useDisclosure();
  const underwriter = useDisclosure();

  return (
    <Box
      className={styles.container}
      border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
    >
      <Heading as="h2" fontSize={"2rem"} mb={10} className="text-shadow">
        Manage Policies
      </Heading>
      <PolicyDetails isOpen={policyDetails.isOpen} onClose={policyDetails.onClose} />
      <CreatePolicy isOpen={createPolicy.isOpen} onClose={createPolicy.onClose} />
      <AddUnderwriter isOpen={underwriter.isOpen} onClose={underwriter.onClose} />

      <Flex justify={"right"} width={"90%"}>
        <Button colorScheme="blue" size="md" onClick={createPolicy.onOpen}>
          Create New Policy
        </Button>
      </Flex>
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
                <Th>Underwriters</Th>
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
                <Td>Active</Td>
                <Td>30 Days</Td>
                <Td>10000</Td>
                <Td>5</Td>
                <Td>
                  <Button onClick={policyDetails.onOpen}>Details</Button>
                </Td>
                <Td>
                  <Button onClick={underwriter.onOpen}>Add Underwriter</Button>
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
                <Td>Active</Td>
                <Td>30 Days</Td>
                <Td>10000</Td>
                <Td>5</Td>
                <Td>
                  <Button onClick={policyDetails.onOpen}>Details</Button>
                </Td>
                <Td>
                  <Button onClick={underwriter.onOpen}>Add Underwriter</Button>
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
                <Td>Active</Td>
                <Td>30 Days</Td>
                <Td>10000</Td>
                <Td>5</Td>
                <Td>
                  <Button onClick={policyDetails.onOpen}>Details</Button>
                </Td>
                <Td>
                  <Button onClick={underwriter.onOpen}>Add Underwriter</Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Box>
  );
};
