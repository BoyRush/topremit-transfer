import { getTransactionById } from "@/services/transaction.service";
import { TransactionDetailView } from "@/components/history/TransactionDetailView";

export const dynamic = "force-dynamic";

interface HistoryDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: HistoryDetailPageProps) {
  const { id } = await params;
  return {
    title: `Detail Transaksi ${id} | Topremit International Money Transfer`,
    description: `Rincian lengkap status dan transaksi pengiriman uang internasional ${id}.`,
  };
}

export default async function HistoryDetailPage({ params }: HistoryDetailPageProps) {
  const { id } = await params;
  const initialTransaction = getTransactionById(id) || null;

  return <TransactionDetailView transactionId={id} initialTransaction={initialTransaction} />;
}

