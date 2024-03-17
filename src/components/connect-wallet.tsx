"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";

export default function ConnectWallet() {
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const account = useAccount();

  return account.isConnected ? (
    <button className="border p-2" onClick={() => disconnect()}>
      Disconnect
    </button>
  ) : (
    <button className="border p-2" onClick={openConnectModal}>
      Connect Wallet
    </button>
  );
}
