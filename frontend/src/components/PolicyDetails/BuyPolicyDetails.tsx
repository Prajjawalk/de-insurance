import { type FC } from "react";

import { Tr, Td, Button, useDisclosure, Flex } from "@chakra-ui/react";
import { fromHex } from "viem";
import { useAccount } from "wagmi";

import { PolicyCheckout } from "../Modal/PolicyCheckout";
import { PolicyDetails } from "../Modal/PolicyDetails";

interface Props {
  token: string;
  underlyingtoken: string;
  underlyingtokenAddress: `0x${string}`;
  policyId: string;
  poolAddress: `0x${string}`;
  price: bigint;
  validity: bigint;
  maxClaim: bigint;
  underwriters: bigint;
  tnc: string;
}

export const BuyPolicyDetails: FC<Props> = (props) => {
  const policyDetails = useDisclosure();
  const buyPolicy = useDisclosure();
  const policyTnc = fromHex(props.tnc as `0x${string}`, "string");
  const { chain } = useAccount();

  return (
    <>
      <PolicyDetails
        isOpen={policyDetails.isOpen}
        onClose={policyDetails.onClose}
        details={policyTnc}
      />
      <PolicyCheckout
        isOpen={buyPolicy.isOpen}
        onClose={buyPolicy.onClose}
        poolAddress={props.poolAddress}
        policyId={props.policyId}
        price={props.price}
        validity={props.validity}
        minUnderwriters={props.underwriters}
        underlyingToken={props.underlyingtoken}
        underlyingTokenAddress={props.underlyingtokenAddress}
      />
      <Tr>
        <Td>
          <Flex gap={"2"}>
            {/* <img width={"20"} height={"20"} src="usdc_logo.png" alt="USDC" /> */}
            {(props.token + "/" + props.underlyingtoken) as string}
          </Flex>
        </Td>
        <Td>{chain?.name}</Td>
        <Td>{String(props.price)}</Td>
        <Td>{String(props.validity / 86400n)} Days</Td>
        <Td>{String(props.maxClaim)}</Td>
        <Td>
          <Button onClick={policyDetails.onOpen}>Details</Button>
        </Td>
        <Td>
          <Button onClick={buyPolicy.onOpen}>Buy</Button>
        </Td>
      </Tr>
    </>
  );
};
