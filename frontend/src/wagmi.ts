"use client";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { defineChain, type Transport } from "viem";
import { createConfig, http } from "wagmi";
import { sepolia, hederaTestnet, rootstockTestnet } from "wagmi/chains";

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!walletConnectProjectId) {
  throw new Error(
    "WalletConnect project ID is not defined. Please check your environment variables.",
  );
}

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
        ledgerWallet,
        rabbyWallet,
        coinbaseWallet,
        argentWallet,
        safeWallet,
      ],
    },
  ],
  { appName: "Next-Web3-Boilerplate", projectId: walletConnectProjectId },
);

const kinto = defineChain({
  id: 7887,
  name: "Kinto Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.kinto-rpc.com"],
      webSocket: ["wss://rpc.kinto.xyz/ws"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.kinto.xyz" },
  },
});

const transports: Record<number, Transport> = {
  [sepolia.id]: http(),
  [hederaTestnet.id]: http(),
  [rootstockTestnet.id]: http(),
  [kinto.id]: http(),
};
export const wagmiConfig = createConfig({
  chains: [sepolia, hederaTestnet, rootstockTestnet, kinto],
  connectors,
  transports,
  ssr: true,
});
