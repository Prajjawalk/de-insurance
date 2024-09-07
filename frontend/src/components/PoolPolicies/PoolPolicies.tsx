import { type FC } from "react";

import { BaseError, useReadContracts } from "wagmi";

import vaultAbi from "../../../artifacts/Vault.sol/Vault.json";
import { BuyPolicyDetails } from "../PolicyDetails/BuyPolicyDetails";

interface Props {
  address: `0x${string}`;
}

interface PolicyData {
  id: bigint;
  maxClaim: bigint;
  minUnderwriters: bigint;
  price: bigint;
  terms: string;
  validityPeriod: bigint;
}

export const PoolPolicies: FC<Props> = (props) => {
  const poolData = useReadContracts({
    contracts: [
      {
        abi: vaultAbi.abi,
        address: props.address,
        functionName: "asset",
      },
      {
        abi: vaultAbi.abi,
        address: props.address,
        functionName: "symbol",
      },
      {
        abi: vaultAbi.abi,
        address: props.address,
        functionName: "underlyingTokenSymbol",
      },
      {
        abi: vaultAbi.abi,
        address: props.address,
        functionName: "getAllPolicies",
      },
    ],
  });

  // useEffect(() => {
  //   if (poolData.isSuccess && poolData.data[4].result) {
  //     setPoolOwner(String(poolData.data[4].result));
  //   }
  // }, [poolData.data, poolData.isSuccess]);

  if (poolData.isPending) return <div>Loading...</div>;

  if (poolData.error)
    return <div>Error: {(poolData.error as BaseError).shortMessage || poolData.error.message}</div>;

  const [asset, symbol, underlyingTokenSymbol, poolPolicies] = poolData.data || [];

  const policyData = (poolPolicies.result as Array<PolicyData>).map(
    (i: PolicyData, idx: number) => (
      <BuyPolicyDetails
        token={symbol.result as string}
        underlyingtoken={underlyingTokenSymbol.result as string}
        policyId={String(i.id)}
        poolAddress={props.address as `0x${string}`}
        key={idx}
        price={i.price}
        validity={i.validityPeriod}
        maxClaim={i.maxClaim}
        underwriters={i.minUnderwriters}
        tnc={i.terms}
        underlyingtokenAddress={asset.result as `0x${string}`}
      />
    ),
  );

  return <>{policyData}</>;
};
