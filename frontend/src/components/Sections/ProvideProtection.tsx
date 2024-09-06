import type { FC } from "react";

import {
  Box,
  Heading,
  Button,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { BaseError, useChainId, useReadContract } from "wagmi";

import poolFactoryAbi from "../../../artifacts/PoolFactory.sol/PoolFactory.json";
import { CreatePool } from "../Modal/CreatePool";
import { PoolDetails } from "../PoolDetails/PoolDetails";
import { broadCastDetails } from "@/broadcastDetails";
import styles from "@/styles/mainPane.module.css";

interface Props {
  setpage: (name: string) => void;
  setPool: (name: string) => void;
}

export const ProvideProtection: FC<Props> = (props) => {
  const { colorMode } = useColorMode();
  const createPool = useDisclosure();

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
    <PoolDetails address={i} key={idx} setpage={props.setpage} setPool={props.setPool} />
  ));

  return (
    <Box
      className={styles.container}
      border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
    >
      <Heading as="h2" fontSize={"2rem"} mb={10} className="text-shadow">
        Insurance pools
      </Heading>
      <Flex justify={"right"} width={"90%"}>
        <Button colorScheme="blue" size="md" onClick={createPool.onOpen}>
          Create Pool
        </Button>
      </Flex>

      <CreatePool isOpen={createPool.isOpen} onClose={createPool.onClose} />
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
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>{poolData}</Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Box>
  );
};
