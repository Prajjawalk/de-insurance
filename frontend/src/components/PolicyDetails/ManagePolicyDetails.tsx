import { type FC } from "react";

import { Tr, Td, Button, useDisclosure } from "@chakra-ui/react";
import { fromHex } from "viem";

import { AddUnderwriter } from "../Modal/AddUnderwriter";
import { PolicyDetails } from "../Modal/PolicyDetails";

interface Props {
  poolAddress: `0x${string}`;
  price: bigint;
  validity: bigint;
  maxClaim: bigint;
  underwriters: bigint;
  tnc: string;
}

export const ManagePolicyDetails: FC<Props> = (props) => {
  const policyDetails = useDisclosure();
  const underwriter = useDisclosure();
  const policyTnc = fromHex(props.tnc as `0x${string}`, "string");

  return (
    <>
      <PolicyDetails
        isOpen={policyDetails.isOpen}
        onClose={policyDetails.onClose}
        details={policyTnc}
      />
      <AddUnderwriter
        isOpen={underwriter.isOpen}
        onClose={underwriter.onClose}
        poolAddress={props.poolAddress}
      />
      <Tr>
        <Td>{String(props.price)}</Td>
        <Td>{String(props.validity / 86400n)} Days</Td>
        <Td>{String(props.maxClaim)}</Td>
        <Td>{String(props.underwriters)}</Td>
        <Td>
          <Button onClick={policyDetails.onOpen}>Details</Button>
        </Td>
        <Td>
          <Button onClick={underwriter.onOpen}>Add Underwriter</Button>
        </Td>
      </Tr>
    </>
  );
};
