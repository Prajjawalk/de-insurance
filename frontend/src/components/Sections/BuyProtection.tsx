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
} from "@chakra-ui/react";
import type { BaseError } from "viem";
import { useChainId, useReadContract } from "wagmi";

import poolFactoryAbi from "../../../artifacts/PoolFactory.sol/PoolFactory.json";
import { PoolPolicies } from "../PoolPolicies/PoolPolicies";
import { broadCastDetails } from "@/broadcastDetails";
import styles from "@/styles/mainPane.module.css";

export const BuyProtection: FC = () => {
  const { colorMode } = useColorMode();

  const chainId = useChainId();

  const { data, error, isPending } = useReadContract({
    abi: poolFactoryAbi.abi,
    address: broadCastDetails.PoolFactory[
      chainId as unknown as keyof typeof broadCastDetails.PoolFactory
    ] as `0x${string}`,
    functionName: "getAllPools",
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {(error as unknown as BaseError).details || error.message}</div>;

  const poolData = (data as Array<`0x${string}`>).map((i: `0x${string}`, idx: number) => (
    <PoolPolicies address={i} key={idx} />
  ));

  return (
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
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {poolData}
              {/* <Tr>
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
              </Tr> */}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Box>
  );
};
