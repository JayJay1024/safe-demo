import Account from "@/components/account";
import ConnectWallet from "@/components/connect-wallet";

export default function Debug() {
  return (
    <main className="min-h-screen flex items-center justify-center flex-col gap-5">
      <ConnectWallet />
      <Account />
    </main>
  );
}
