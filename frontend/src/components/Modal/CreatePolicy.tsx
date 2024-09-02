import { useState, type FC } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePolicy: FC<Props> = (props) => {
  const [bridges, setBridges] = useState([{ name: "", chain: "", deptToken: "", address: "" }]);
  const [dexes, setDexes] = useState([{ name: "", chain: "", pool: "", token: "", address: "" }]);
  const [liquidityPools, setliquidityPools] = useState([
    { name: "", chain: "", pool: "", token: "", address: "" },
  ]);

  const handleBridgeInputChange = (index: number, field: unknown, value: string) => {
    const newRows = [...bridges];
    newRows[index][field as keyof { name: ""; chain: ""; deptToken: ""; address: "" }] = value;
    setBridges(newRows);
  };

  const addBridge = () => {
    console.log("adding bridge");
    setBridges([...bridges, { name: "", chain: "", deptToken: "", address: "" }]);
  };

  const removeBridge = (index: any) => {
    const newRows = [...bridges];
    newRows.splice(index, 1);
    setBridges(newRows);
  };

  function BridgeInputs() {
    return (
      <Flex flexDir={"column"} gap={"5"}>
        {bridges.map((bridge, index) => (
          <Flex key={`${index}`} flexDir={"row"} gap={"5"}>
            <Input
              placeholder="Name"
              size="md"
              value={bridge.name}
              onChange={(e) => handleBridgeInputChange(index, "name", e.target.value)}
            />
            <Input
              placeholder="Chain"
              size="md"
              value={bridge.chain}
              onChange={(e) => handleBridgeInputChange(index, "chain", e.target.value)}
            />
            <Input
              placeholder="Dept Token"
              size="md"
              value={bridge.deptToken}
              onChange={(e) => handleBridgeInputChange(index, "deptToken", e.target.value)}
            />
            <Input
              placeholder="Address"
              size="md"
              value={bridge.address}
              onChange={(e) => handleBridgeInputChange(index, "address", e.target.value)}
            />
            <Button onClick={() => removeBridge(index)}>-</Button>
          </Flex>
        ))}
      </Flex>
    );
  }

  const handleDexInputChange = (index: number, field: unknown, value: string) => {
    const newRows = [...dexes];
    newRows[index][field as keyof { name: ""; chain: ""; pool: ""; token: ""; address: "" }] =
      value;
    setDexes(newRows);
  };

  const addDex = () => {
    setDexes([...dexes, { name: "", chain: "", pool: "", token: "", address: "" }]);
  };

  const removeDex = (index: any) => {
    const newRows = [...dexes];
    newRows.splice(index, 1);
    setDexes(newRows);
  };

  function DexInputs() {
    return (
      <Flex flexDir={"column"} gap={"5"}>
        {dexes.map((dex, index) => (
          <Flex key={`${index}`} flexDir={"row"} gap={"5"}>
            <Input
              placeholder="Name"
              size="md"
              value={dex.name}
              onChange={(e) => handleDexInputChange(index, "name", e.target.value)}
            />
            <Input
              placeholder="Chain"
              size="md"
              value={dex.chain}
              onChange={(e) => handleDexInputChange(index, "chain", e.target.value)}
            />

            <Input
              placeholder="Pool"
              size="md"
              value={dex.chain}
              onChange={(e) => handleDexInputChange(index, "chain", e.target.value)}
            />
            <Input
              placeholder="Token"
              size="md"
              value={dex.token}
              onChange={(e) => handleDexInputChange(index, "token", e.target.value)}
            />
            <Input
              placeholder="Address"
              size="md"
              value={dex.address}
              onChange={(e) => handleDexInputChange(index, "address", e.target.value)}
            />
            <Button onClick={() => removeDex(index)}>-</Button>
          </Flex>
        ))}
      </Flex>
    );
  }

  const handleLiquidityPoolInputChange = (index: number, field: unknown, value: string) => {
    const newRows = [...liquidityPools];
    newRows[index][field as keyof { name: ""; chain: ""; pool: ""; token: ""; address: "" }] =
      value;
    setDexes(newRows);
  };

  const addLiquidityPool = () => {
    setliquidityPools([
      ...liquidityPools,
      { name: "", chain: "", pool: "", token: "", address: "" },
    ]);
  };

  const removeLiquidityPool = (index: any) => {
    const newRows = [...liquidityPools];
    newRows.splice(index, 1);
    setliquidityPools(newRows);
  };

  function LiquidityPoolInputs() {
    return (
      <Flex flexDir={"column"} gap={"5"}>
        {liquidityPools.map((pool, index) => (
          <Flex key={`${index}`} flexDir={"row"} gap={"5"}>
            <Input
              placeholder="Name"
              size="md"
              value={pool.name}
              onChange={(e) => handleLiquidityPoolInputChange(index, "name", e.target.value)}
            />
            <Input
              placeholder="Chain"
              size="md"
              value={pool.chain}
              onChange={(e) => handleLiquidityPoolInputChange(index, "chain", e.target.value)}
            />

            <Input
              placeholder="Pool"
              size="md"
              value={pool.chain}
              onChange={(e) => handleLiquidityPoolInputChange(index, "chain", e.target.value)}
            />
            <Input
              placeholder="Token"
              size="md"
              value={pool.token}
              onChange={(e) => handleLiquidityPoolInputChange(index, "token", e.target.value)}
            />
            <Input
              placeholder="Address"
              size="md"
              value={pool.address}
              onChange={(e) => handleLiquidityPoolInputChange(index, "address", e.target.value)}
            />
            <Button onClick={() => removeLiquidityPool(index)}>-</Button>
          </Flex>
        ))}
      </Flex>
    );
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} scrollBehavior={"inside"} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Policy</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <Flex flexDir={"column"} gap={"5"}>
            <Flex>Enter Price</Flex>
            <Input placeholder="Price" size="md" />
            <Flex>Enter Max Claim</Flex>
            <Input placeholder="Amount" size="md" />
            <Flex>Validity Period (Days)</Flex>
            <Input placeholder="Validity" size="md" />
            <Flex>Minimum Underwriters</Flex>
            <Input placeholder="Underwriters" size="md" />
            <Flex gap="5">
              {"Bridge protections"}
              <Button onClick={() => addBridge()}>+</Button>
            </Flex>
            <BridgeInputs />
            <Flex gap="5">
              {"Dex protections"}
              <Button onClick={() => addDex()}>+</Button>
            </Flex>
            <DexInputs />
            <Flex gap="5">
              {"Liquidity Pool protections"}
              <Button onClick={() => addLiquidityPool()}>+</Button>
            </Flex>
            <LiquidityPoolInputs />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Create
          </Button>
          <Button variant="ghost" onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
