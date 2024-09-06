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
  useColorMode,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { BaseError, useReadContract } from "wagmi";

import vaultAbi from "../../../artifacts/Vault.sol/Vault.json";
import { AddUnderwriter } from "../Modal/AddUnderwriter";
import { CreatePolicy } from "../Modal/CreatePolicy";
import { ManagePolicyDetails } from "../PolicyDetails/ManagePolicyDetails";
import styles from "@/styles/mainPane.module.css";

interface Props {
  setpage: (name: string) => void;
  pool: string;
}

interface PolicyData {
  id: bigint;
  maxClaim: bigint;
  minUnderwriters: bigint;
  price: bigint;
  terms: string;
  validityPeriod: bigint;
}

export const ManagePolicies: FC<Props> = (props) => {
  const { colorMode } = useColorMode();
  const createPolicy = useDisclosure();
  const underwriter = useDisclosure();

  // const chainId = useChainId();

  const { data, error, isPending } = useReadContract({
    abi: vaultAbi.abi,
    address: props.pool as `0x${string}`,
    functionName: "getAllPolicies",
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {(error as unknown as BaseError).details || error.message}</div>;

  const policyData = (data as Array<PolicyData>).map((i: PolicyData, idx: number) => (
    <ManagePolicyDetails
      poolAddress={props.pool as `0x${string}`}
      key={idx}
      price={i.price}
      validity={i.validityPeriod}
      maxClaim={i.maxClaim}
      underwriters={i.minUnderwriters}
      tnc={i.terms}
    />
  ));

  return (
    <Box
      className={styles.container}
      border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
    >
      <Heading as="h2" fontSize={"2rem"} mb={10} className="text-shadow">
        Manage Policies
      </Heading>
      {/* <PolicyDetails isOpen={policyDetails.isOpen} onClose={policyDetails.onClose} /> */}
      <CreatePolicy
        isOpen={createPolicy.isOpen}
        onClose={createPolicy.onClose}
        address={props.pool}
      />
      <AddUnderwriter isOpen={underwriter.isOpen} onClose={underwriter.onClose} />

      <Flex width={"90%"} mx={"auto"} justifyContent={"space-between"}>
        <Button colorScheme="blue" size="md" onClick={() => props.setpage("provide")}>
          Back
        </Button>
        <Button colorScheme="blue" size="md" onClick={createPolicy.onOpen}>
          Create New Policy
        </Button>
      </Flex>
      <Flex className={styles.content}>
        <TableContainer width="90%">
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Price</Th>
                <Th>Validity</Th>
                <Th>Max Claim</Th>
                <Th>Underwriters</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>{policyData}</Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Box>
  );
};
