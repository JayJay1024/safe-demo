"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isAddress, parseUnits } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

export default function Transfer() {
  const [recipient, setRecipient] = useState("");
  const [busy, setBusy] = useState(false);

  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const [amount, _setAmount] = useState("");
  const amountRef = useRef(amount);
  const setAmount = useCallback((value: string) => {
    _setAmount(value);
    amountRef.current = value;
  }, []);

  const account = useAccount();
  const senderRef = useRef(account.address);
  useEffect(() => {
    senderRef.current = account.address;
  }, [account.address]);

  const handleTransfer = useCallback(async () => {
    if (!senderRef.current) {
      alert("Sender is undefined!");
      return;
    }

    if (!isAddress(recipient)) {
      alert("Invalid recipient!");
      return;
    }

    if (Number.isNaN(Number(amountRef.current))) {
      alert("Invalid amount input!");
      return;
    }

    if (!walletClient || !publicClient) {
      alert("Wallet client or public client is undefined!");
      return;
    }

    setBusy(true);
    try {
      const hash = await walletClient.sendTransaction({
        account: senderRef.current,
        to: recipient,
        value: parseUnits(amountRef.current, 18),
      });
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      setBusy(false);

      if (receipt.status === "success") {
        console.info("Transaction success.");
      }
    } catch (err) {
      console.error(err);
      alert((err as Error).message);
      setBusy(false);
    }
  }, [recipient, walletClient, publicClient]);

  return (
    <div className="flex flex-col gap-3 border p-2">
      <input
        className="text-black"
        placeholder="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input className="text-black" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button className="border p-2" disabled={busy} onClick={handleTransfer}>
        Transfer
      </button>
    </div>
  );
}
