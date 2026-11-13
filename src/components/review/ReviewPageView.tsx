"use client";

import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { AppShell, MainContainer, PageHeading } from "@/components/layout";
import {
  PrimaryButton,
  SecondaryButton,
  TransactionStepper,
  TransferSummary,
} from "@/components/common";
import { TransferReviewCard } from "./TransferReviewCard";
import { PaymentBankPicker } from "./PaymentBankPicker";
import { ConfirmTransferDialog } from "./ConfirmTransferDialog";
import { useTransferStore } from "@/store/transfer-store";
import { usePaymentBanks } from "@/hooks/usePaymentBanks";
import type { PaymentBank } from "@/models/payment-bank";
import type { CreateTransactionPayload } from "@/models/transaction";

export function ReviewPageView() {
  const router = useRouter();
  const store = useTransferStore();

  const { paymentBanks } = usePaymentBanks();

  // Selected payment bank ID state
  const [selectedBankId, setSelectedBankId] = React.useState<string | null>(
    store.paymentBank || "bca"
  );
  const [bankError, setBankError] = React.useState<string | null>(null);

  // Dialog and submission state
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const selectedPaymentBank = React.useMemo<PaymentBank | undefined>(() => {
    return paymentBanks.find((b) => b.id.toLowerCase() === selectedBankId?.toLowerCase());
  }, [paymentBanks, selectedBankId]);

  const handleSelectPaymentBank = (id: string) => {
    setSelectedBankId(id);
    setBankError(null);
    store.setPaymentBank(id);
  };

  // Open confirmation dialog validation
  const handleOpenDialog = () => {
    if (!selectedBankId) {
      setBankError("Silakan pilih bank pembayaran terlebih dahulu");
      return;
    }
    setBankError(null);
    setIsDialogOpen(true);
  };

  // Explicit confirmation: Creates the transaction
  const handleConfirmTransfer = async () => {
    if (isSubmitting) return; // Prevent double submission

    if (!store.recipient) {
      setSubmitError("Data penerima tidak lengkap. Silakan periksa kembali formulir penerima.");
      setIsDialogOpen(false);
      return;
    }

    if (!selectedPaymentBank) {
      setBankError("Silakan pilih bank pembayaran");
      setIsDialogOpen(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload: CreateTransactionPayload = {
        destinationCountry: {
          code: store.destinationCountryCode,
          name: store.destinationCountryName,
          flagEmoji: store.destinationFlag,
        },
        destinationCurrency: store.destinationCurrency,
        sendAmount: store.sendAmountIdr,
        receiveAmount: store.receiveAmountFx,
        exchangeRate: store.exchangeRate,
        service: store.serviceType,
        speed: store.speed,
        transferFee: store.transferFeeIdr,
        totalPayment: Math.max(0, store.sendAmountIdr + store.transferFeeIdr - store.discountIdr),
        paymentBank: selectedPaymentBank,
        recipient: {
          bankCode: store.recipient.bankCode,
          bankName: store.recipient.bankName,
          accountNumber: store.recipient.accountNumber,
          fullName: store.recipient.fullName,
          transferPurpose: store.recipient.transferPurpose,
          email: store.recipient.email,
          note: store.recipient.note,
        },
      };

      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Gagal membuat transaksi: server responded ${res.status}`);
      }

      const result = await res.json();
      if (!result.success || !result.data) {
        throw new Error(result.message || "Gagal memproses transaksi simulasi");
      }

      // Close dialog & update step
      setIsDialogOpen(false);
      store.setStep(4);

      // Navigate to success page
      router.push(`/success/${result.data.id}`);
    } catch (err) {
      console.error("Transaction confirmation error:", err);
      setSubmitError(
        err instanceof Error ? err.message : "Terjadi kendala saat memproses transfer"
      );
      setIsDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPayment = Math.max(0, store.sendAmountIdr + store.transferFeeIdr - store.discountIdr);

  return (
    <AppShell>
      <MainContainer maxW="1080px">
        {/* Page Heading: "Check before you send" */}
        <PageHeading
          title="Check before you send"
          subtitle="Periksa kembali ringkasan transaksi sebelum mengonfirmasi pengiriman dana."
          backHref="/recipient"
          backLabel="Kembali ke Data Penerima"
        />

        {/* Stepper: Step 3 active */}
        <TransactionStepper currentStep={3} />

        <SimpleGrid columns={{ base: 1, lg: 12 }} gap={8} alignContent="start">
          {/* Left Column: Review Summary & Payment Bank Picker (7 cols) */}
          <Box gridColumn={{ base: "span 1", lg: "span 7" }}>
            <VStack gap={5} align="stretch">
              {/* Comprehensive Transfer Summary Cards */}
              <TransferReviewCard draft={store} />

              {/* Payment Bank Picker (Indonesian Source Bank) */}
              <PaymentBankPicker
                paymentBanks={paymentBanks}
                selectedBankId={selectedBankId}
                onSelectBank={handleSelectPaymentBank}
                error={bankError || undefined}
              />

              {/* Error Notice if Submission Failed */}
              {submitError && (
                <Box p={4} bg="#FEE2E2" borderRadius="12px" border="1px solid #FECACA">
                  <Text fontSize="13px" color="#B91C1C" fontWeight="600">
                    {submitError}
                  </Text>
                </Box>
              )}
            </VStack>
          </Box>

          {/* Right Column: Mini Summary & Confirmation Trigger (5 cols) */}
          <Box gridColumn={{ base: "span 1", lg: "span 5" }}>
            <VStack gap={4} align="stretch" position={{ lg: "sticky" }} top={{ lg: "92px" }}>
              <TransferSummary
                sendAmountIdr={store.sendAmountIdr}
                receiveAmountFx={store.receiveAmountFx}
                currencyCode={store.destinationCurrency}
                exchangeRate={store.exchangeRate}
                transferFeeIdr={store.transferFeeIdr}
                discountIdr={store.discountIdr}
                promoCode={store.appliedPromoCode}
                paymentBankName={selectedPaymentBank?.name}
              />

              {/* Action Buttons */}
              <VStack gap={2.5} align="stretch">
                <PrimaryButton
                  size="lg"
                  isFullWidth
                  onClick={handleOpenDialog}
                  disabled={!store.recipient || isSubmitting}
                  rightIcon={<ArrowRight size={18} />}
                >
                  Lanjutkan & Konfirmasi
                </PrimaryButton>

                <Link href="/recipient" style={{ textDecoration: "none" }}>
                  <SecondaryButton isFullWidth leftIcon={<ArrowLeft size={16} />}>
                    Kembali ke Data Penerima
                  </SecondaryButton>
                </Link>
              </VStack>

              {/* Security info */}
              <Box
                bg="#EAF6FF"
                p={4}
                borderRadius="14px"
                border="1px solid #D8EDFF"
                display="flex"
                gap={3}
                alignItems="start"
              >
                <ShieldCheck
                  color="#269FEF"
                  size={20}
                  style={{ flexShrink: 0, marginTop: "2px" }}
                />
                <Box fontSize="12px" color="#0F6BB0" lineHeight="tall">
                  <Text fontWeight="700">Perlindungan Transaksi Aman</Text>
                  <Text mt={0.5}>
                    Simulasi transaksi ini dilindungi protokol enkripsi berstandar perbankan Bank
                    Indonesia.
                  </Text>
                </Box>
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>

        {/* Accessible Confirmation Dialog */}
        <ConfirmTransferDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={handleConfirmTransfer}
          isSubmitting={isSubmitting}
          recipientName={store.recipient?.fullName || "Penerima"}
          destinationCountry={`${store.destinationFlag} ${store.destinationCountryName} (${store.destinationCurrency})`}
          sendAmountIdr={store.sendAmountIdr}
          transferFeeIdr={store.transferFeeIdr}
          totalPaymentIdr={totalPayment}
        />
      </MainContainer>
    </AppShell>
  );
}
