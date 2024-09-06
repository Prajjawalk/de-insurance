// components/MainPane.tsx
import { useState, type FC } from "react";

import { Button, Flex } from "@chakra-ui/react";

import { BuyProtection } from "../Sections/BuyProtection";
import { ClaimProtection } from "../Sections/ClaimProtection";
import { ManagePolicies } from "../Sections/ManagePolicies";
import { ProvideProtection } from "../Sections/ProvideProtection";
import styles from "@/styles/mainPane.module.css";

const MainPane: FC = () => {
  const [page, setPage] = useState("buy");
  const [pool, setPool] = useState<string>();

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
        <Button colorScheme="blue" size="lg" onClick={() => setPage("manage")}>
          Manage Policies
        </Button>
      </Flex>
      <Flex className={styles.content}>
        {page == "provide" ? (
          <ProvideProtection setpage={setPage} setPool={setPool} />
        ) : page == "buy" ? (
          <BuyProtection />
        ) : page == "claim" ? (
          <ClaimProtection />
        ) : (
          <ManagePolicies setpage={setPage} pool={pool as string} />
        )}
      </Flex>
    </Flex>
  );
};

export default MainPane;
