"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { Chain, sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import {
  injectedWallet,
  metaMaskWallet,
  okxWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

const darwinia: Chain = {
  id: 46,
  name: "Darwinia",
  nativeCurrency: { name: "RING", symbol: "RING", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.darwinia.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "Subscan",
      url: "https://darwinia.subscan.io",
    },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 251739,
    },
  },
};

const appName = "Safe Demo";
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "";
const config = getDefaultConfig({
  appName,
  projectId,
  wallets: [{ groupName: "Popular", wallets: [metaMaskWallet, okxWallet, safeWallet, walletConnectWallet] }],
  chains: [sepolia, darwinia],
});
const queryClient = new QueryClient();

export default function RainbowProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
