"use client";

import { useAccount } from "wagmi";

export default function Account() {
  const account = useAccount();

  return (
    <div className="border flex flex-col p-2">
      <span>address: {account.address}</span>
      <span>addresses: {account.addresses?.join(", ")}</span>
      <span>
        chain: {account.chainId}, {account.chain?.name}
      </span>
      <span>is connected: {account.isConnected ? "true" : "false"}</span>
      <span>status: {account.status}</span>
    </div>
  );
}
