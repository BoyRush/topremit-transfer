"use client";

import * as React from "react";
import Link from "next/link";
import { Box, Flex, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { CheckCircle2, Clock, Copy, Home, Info } from "lucide-react";
import { AppShell, MainContainer, PageHeading } from "@/components/layout";
import {
  LoadingState,
  PrimaryButton,
  SecondaryButton,
  StatusBadge,
  TransactionStepper,
} from "@/components/common";
import { StarRating } from "@/components/common/StarRating";
import { useTransactionDetails } from "@/hooks/useTransactionDetails";
import { maskAccountNumber } from "@/services/currency-math";
import type { Transaction } from "@/models/transaction";

export interface SuccessPageViewProps {
  transactionId: string;
  initialTransaction?: Transaction | null;
}

export function SuccessPageView({ transactionId, initialTransaction }: SuccessPageViewProps) {
  const { transaction: liveTransaction, isLoading } = useTransactionDetails(transactionId);
  const transaction = liveTransaction || initialTransaction;

  const [copied, setCopied] = React.useState(false);

  const handleCopyRef = () => {
    if (!transaction) return;
    navigator.clipboard.writeText(transaction.transactionReference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatIdr = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  const formatFx = (val: number, currency: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(val);

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      }).format(d);
    } catch {
      return isoString;
    }
  };

  return (
    <AppShell>
      <MainContainer maxW="880px">
        {/* Page Heading matching spec */}
        <PageHeading
          title="Money's on the way"
          subtitle="Transaksi simulasi pengiriman uang Anda telah berhasil dibuat dan sedang diproses."
        />

        {/* Stepper: Step 4 Active */}
        <TransactionStepper currentStep={4} />

        {/* Simulation Disclaimer Banner */}
        <Box bg="#EFF6FF" border="1px solid #BFDBFE" p={3.5} borderRadius="12px" mb={6}>
          <HStack gap={2.5} align="flex-start">
            <Info size={18} color="#2563EB" style={{ marginTop: "2px", flexShrink: 0 }} />
            <Text fontSize="13px" color="#1E40AF" lineHeight="1.5">
              <strong>Simulasi Prototipe:</strong> Ini adalah simulasi transaksi pengiriman dana
              internasional. Tidak ada dana riil yang dipotong dari rekening Anda atau ditransfer ke
              bank luar negeri.
            </Text>
          </HStack>
        </Box>

        {isLoading && !transaction ? (
          <Box bg="#FFFFFF" p={8} borderRadius="20px" border="1px solid #E7EDF5">
            <LoadingState message="Memuat rincian transaksi pengiriman..." />
          </Box>
        ) : !transaction ? (
          <Box bg="#FFFFFF" p={8} borderRadius="20px" border="1px solid #E7EDF5" textAlign="center">
            <Text fontSize="16px" fontWeight="700" color="#DC2626" mb={2}>
              Transaksi Tidak Ditemukan
            </Text>
            <Text fontSize="13px" color="#64748B" mb={4}>
              Referensi transaksi <strong>{transactionId}</strong> tidak ditemukan di sistem.
            </Text>
            <Link href="/history" style={{ textDecoration: "none" }}>
              <PrimaryButton>Lihat Riwayat Transaksi</PrimaryButton>
            </Link>
          </Box>
        ) : (
          <VStack gap={6} align="stretch">
            {/* Top Success Banner Card */}
            <Box
              bg="#FFFFFF"
              p={{ base: 6, sm: 8 }}
              borderRadius="20px"
              border="1px solid #E7EDF5"
              boxShadow="0px 4px 16px rgba(15, 23, 42, 0.04)"
              textAlign="center"
            >
              {/* Checkmark Icon */}
              <Flex justify="center" mb={4}>
                <Box
                  w="68px"
                  h="68px"
                  borderRadius="full"
                  bg="#DCFCE7"
                  color="#16A34A"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="0 0 0 8px rgba(22, 163, 74, 0.1)"
                >
                  <CheckCircle2 size={40} strokeWidth={2.5} />
                </Box>
              </Flex>

              <Text fontSize="22px" fontWeight="800" color="#172B4D" mb={1}>
                Pengiriman Berhasil Diajukan
              </Text>
              <Text fontSize="14px" color="#64748B" mb={4}>
                Dana akan diteruskan ke rekening bank penerima sesuai estimasi waktu layanan.
              </Text>

              {/* Transaction Reference & Copy Action */}
              <HStack
                justify="center"
                gap={2}
                bg="#F8FAFC"
                border="1px solid #E2E8F0"
                py={2}
                px={4}
                borderRadius="10px"
                maxW="fit-content"
                mx="auto"
                mb={4}
              >
                <Text fontSize="12px" color="#64748B" fontWeight="600">
                  No. Referensi:
                </Text>
                <Text fontSize="14px" fontFamily="monospace" fontWeight="800" color="#1688DB">
                  {transaction.transactionReference}
                </Text>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  title="Salin nomor referensi"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "2px",
                    display: "inline-flex",
                    alignItems: "center",
                    color: copied ? "#16A34A" : "#64748B",
                  }}
                >
                  <Copy size={14} />
                </button>
                {copied && (
                  <Text fontSize="11px" color="#16A34A" fontWeight="700">
                    Tersalin!
                  </Text>
                )}
              </HStack>

              {/* Status Badge */}
              <Box mb={6}>
                <StatusBadge status={transaction.status} />
              </Box>

              {/* Transfer Details Breakdown */}
              <Box
                bg="#F8FAFC"
                p={{ base: 4, sm: 6 }}
                borderRadius="16px"
                border="1px solid #E2E8F0"
                textAlign="left"
                mb={6}
              >
                <Text fontSize="14px" fontWeight="700" color="#172B4D" mb={4}>
                  Ringkasan Transaksi
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
                  {/* Left Column: Recipient Info */}
                  <VStack align="stretch" gap={3}>
                    <Box>
                      <Text fontSize="12px" color="#64748B">
                        Penerima
                      </Text>
                      <Text fontSize="14px" fontWeight="700" color="#172B4D">
                        {transaction.recipient.fullName}
                      </Text>
                    </Box>

                    <Box>
                      <Text fontSize="12px" color="#64748B">
                        Bank & No. Rekening Penerima
                      </Text>
                      <Text fontSize="14px" fontWeight="600" color="#172B4D">
                        {transaction.recipient.bankName}
                      </Text>
                      <Text fontSize="13px" fontFamily="monospace" color="#64748B">
                        {maskAccountNumber(transaction.recipient.accountNumber)}
                      </Text>
                    </Box>

                    <Box>
                      <Text fontSize="12px" color="#64748B">
                        Negara Tujuan
                      </Text>
                      <HStack gap={1.5} mt={0.5}>
                        <Text fontSize="16px">{transaction.destinationCountry.flagEmoji}</Text>
                        <Text fontSize="14px" fontWeight="600" color="#172B4D">
                          {transaction.destinationCountry.name} (
                          {transaction.destinationCountry.code})
                        </Text>
                      </HStack>
                    </Box>

                    <Box>
                      <Text fontSize="12px" color="#64748B">
                        Tujuan Pengiriman
                      </Text>
                      <Text fontSize="13px" fontWeight="600" color="#334155">
                        {transaction.recipient.transferPurpose.replace(/_/g, " ")}
                      </Text>
                    </Box>
                  </VStack>

                  {/* Right Column: Financial Calculation */}
                  <VStack align="stretch" gap={3}>
                    <Box>
                      <Text fontSize="12px" color="#64748B">
                        Nominal Dikirim
                      </Text>
                      <Text fontSize="14px" fontWeight="700" color="#172B4D">
                        {formatIdr(transaction.sendAmount)}
                      </Text>
                    </Box>

                    <Box>
                      <Text fontSize="12px" color="#64748B">
                        Nominal Diterima
                      </Text>
                      <Text fontSize="16px" fontWeight="800" color="#16A34A">
                        {formatFx(transaction.receiveAmount, transaction.destinationCurrency)}
                      </Text>
                    </Box>

                    <Box>
                      <Text fontSize="12px" color="#64748B">
                        Nilai Tukar
                      </Text>
                      <Text fontSize="13px" color="#334155" fontWeight="600">
                        1 {transaction.destinationCurrency} = IDR{" "}
                        {(1 / transaction.exchangeRate).toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}
                      </Text>
                    </Box>

                    <Box>
                      <Text fontSize="12px" color="#64748B">
                        Biaya Transfer & Kecepatan
                      </Text>
                      <Text fontSize="13px" color="#334155">
                        {formatIdr(transaction.transferFee)} (
                        {transaction.speed === "INSTANT" ? "Instan" : "Reguler"})
                      </Text>
                    </Box>
                  </VStack>
                </SimpleGrid>

                {/* Total Payment Highlight */}
                <Box pt={4} mt={2} borderTop="1px dashed #CBD5E1">
                  <Flex justify="space-between" align="center" flexWrap="wrap" gap={2}>
                    <Box>
                      <Text fontSize="12px" color="#64748B">
                        Total Pembayaran ({transaction.paymentBank.name})
                      </Text>
                      <Text fontSize="12px" color="#94A3B8">
                        Rekening: {transaction.paymentBank.accountNumber} a.n.{" "}
                        {transaction.paymentBank.accountName}
                      </Text>
                    </Box>
                    <Text fontSize="18px" fontWeight="800" color="#269FEF">
                      {formatIdr(transaction.totalPayment)}
                    </Text>
                  </Flex>
                </Box>
              </Box>

              {/* Date of creation */}
              <Text fontSize="12px" color="#94A3B8" mb={6}>
                Waktu Transaksi: {formatDate(transaction.createdAt)}
              </Text>

              {/* Navigation Action Buttons */}
              <HStack justify="center" gap={3} flexWrap="wrap">
                <Link href="/" style={{ textDecoration: "none" }}>
                  <PrimaryButton leftIcon={<Home size={16} />}>Kirim Uang Lagi</PrimaryButton>
                </Link>
                <Link href="/history" style={{ textDecoration: "none" }}>
                  <SecondaryButton leftIcon={<Clock size={16} />}>
                    Lihat Riwayat Transaksi
                  </SecondaryButton>
                </Link>
              </HStack>
            </Box>

            {/* Interactive Rating Component */}
            <StarRating
              transactionId={transaction.id}
              initialRating={transaction.rating}
              initialComment={transaction.ratingComment}
            />
          </VStack>
        )}
      </MainContainer>
    </AppShell>
  );
}
