import Account from "@/components/account";
import ConnectWallet from "@/components/connect-wallet";
import Transfer from "@/components/transfer";

export default function Debug() {
  return (
    <main className="min-h-screen flex items-center justify-center flex-col gap-5">
      <ConnectWallet />
      <Transfer />
      <Account />
    </main>
  );
}
