import { getTransactionById } from "@/services/transaction.service";
import { SuccessPageView } from "@/components/success/SuccessPageView";

export const dynamic = "force-dynamic";

interface SuccessPageProps {
  params: Promise<{ id: string }>;
}

export default async function SuccessPage({ params }: SuccessPageProps) {
  const { id } = await params;
  const initialTransaction = getTransactionById(id) || null;

  return <SuccessPageView transactionId={id} initialTransaction={initialTransaction} />;
}
