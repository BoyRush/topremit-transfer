import { TransactionHistoryView } from "@/components/history/TransactionHistoryView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Riwayat Transaksi | Topremit International Money Transfer",
  description: "Daftar riwayat dan status transaksi pengiriman uang internasional.",
};

export default function HistoryPage() {
  return <TransactionHistoryView />;
}

