"use client";

import * as React from "react";
import Link from "next/link";
import { Box, Flex, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ArrowLeft, Building2, Copy, CreditCard, ExternalLink, Info, User } from "lucide-react";
import { AppShell, MainContainer } from "@/components/layout";
import { LoadingState, PrimaryButton, SecondaryButton, StatusBadge } from "@/components/common";
import { StarRating } from "@/components/common/StarRating";
import { useTransactionDetails } from "@/hooks/useTransactionDetails";
import { maskAccountNumber } from "@/services/currency-math";
import type { Transaction } from "@/models/transaction";

export interface TransactionDetailViewProps {
  transactionId: string;
  initialTransaction?: Transaction | null;
}

export function TransactionDetailView({
  transactionId,
  initialTransaction,
}: TransactionDetailViewProps) {
  const {
    transaction: liveTransaction,
    isLoading,
    isNotFound,
  } = useTransactionDetails(transactionId);
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
      <MainContainer maxW="900px">
        {/* Navigation Breadcrumb / Back button */}
        <Box mb={4}>
          <Link href="/history" style={{ textDecoration: "none" }}>
            <HStack
              gap={1.5}
              color="#269FEF"
              fontSize="13px"
              fontWeight="600"
              display="inline-flex"
              alignItems="center"
              _hover={{ color: "#1688DB" }}
            >
              <ArrowLeft size={16} />
              <span>Kembali ke Riwayat Transaksi</span>
            </HStack>
          </Link>
        </Box>

        {isLoading && !transaction ? (
          <Box bg="#FFFFFF" p={8} borderRadius="16px" border="1px solid #E7EDF5">
            <LoadingState message="Memuat rincian transaksi..." />
          </Box>
        ) : isNotFound || !transaction ? (
          <Box bg="#FFFFFF" p={8} borderRadius="16px" border="1px solid #E7EDF5" textAlign="center">
            <Text fontSize="18px" fontWeight="700" color="#DC2626" mb={2}>
              Transaksi Tidak Ditemukan
            </Text>
            <Text fontSize="14px" color="#64748B" mb={6}>
              Nomor referensi atau ID <strong>{transactionId}</strong> tidak ditemukan di sistem
              simulasi ini.
            </Text>
            <Link href="/history" style={{ textDecoration: "none" }}>
              <PrimaryButton leftIcon={<ArrowLeft size={16} />}>Kembali ke Riwayat</PrimaryButton>
            </Link>
          </Box>
        ) : (
          <VStack gap={6} align="stretch">
            {/* Header Card */}
            <Box
              bg="#FFFFFF"
              p={{ base: 5, sm: 6 }}
              borderRadius="16px"
              border="1px solid #E7EDF5"
              boxShadow="0px 2px 8px rgba(15, 23, 42, 0.03)"
            >
              <Flex
                direction={{ base: "column", sm: "row" }}
                justify="space-between"
                align={{ base: "flex-start", sm: "center" }}
                gap={3}
                mb={4}
              >
                <Box>
                  <Text fontSize="12px" color="#64748B" fontWeight="600">
                    Nomor Referensi Transaksi
                  </Text>
                  <HStack gap={2} mt={0.5}>
                    <Text fontSize="20px" fontWeight="800" fontFamily="monospace" color="#1688DB">
                      {transaction.transactionReference}
                    </Text>
                    <button
                      type="button"
                      onClick={handleCopyRef}
                      title="Salin referensi"
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px",
                        display: "inline-flex",
                        alignItems: "center",
                        color: copied ? "#16A34A" : "#64748B",
                      }}
                    >
                      <Copy size={16} />
                    </button>
                    {copied && (
                      <Text fontSize="11px" color="#16A34A" fontWeight="700">
                        Tersalin!
                      </Text>
                    )}
                  </HStack>
                </Box>

                <StatusBadge status={transaction.status} />
              </Flex>

              <Text fontSize="12px" color="#94A3B8">
                Dibuat pada: {formatDate(transaction.createdAt)} • Terakhir diperbarui:{" "}
                {formatDate(transaction.updatedAt)}
              </Text>
            </Box>

            {/* Simulation Banner */}
            <Box bg="#EFF6FF" border="1px solid #BFDBFE" p={3.5} borderRadius="12px">
              <HStack gap={2.5} align="flex-start">
                <Info size={18} color="#2563EB" style={{ marginTop: "2px", flexShrink: 0 }} />
                <Text fontSize="13px" color="#1E40AF" lineHeight="1.5">
                  <strong>Simulasi Prototipe:</strong> Rincian ini adalah hasil simulasi alur kirim
                  uang internasional. Tidak ada dana riil yang dipotong atau ditransfer ke bank
                  penerima.
                </Text>
              </HStack>
            </Box>

            {/* Main Content Grid: 2 Columns */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} alignContent="start">
              {/* Left Box: Rincian Pengiriman & Biaya */}
              <Box
                bg="#FFFFFF"
                p={{ base: 5, sm: 6 }}
                borderRadius="16px"
                border="1px solid #E7EDF5"
                boxShadow="0px 2px 8px rgba(15, 23, 42, 0.03)"
              >
                <HStack gap={2} mb={4} pb={3} borderBottom="1px solid #F1F5F9">
                  <CreditCard size={18} color="#269FEF" />
                  <Text fontSize="15px" fontWeight="700" color="#172B4D">
                    Rincian Pembayaran & Kurs
                  </Text>
                </HStack>

                <VStack gap={3.5} align="stretch" fontSize="13px">
                  <Flex justify="space-between" align="center">
                    <Text color="#64748B">Nominal Pengiriman</Text>
                    <Text fontWeight="700" color="#172B4D">
                      {formatIdr(transaction.sendAmount)}
                    </Text>
                  </Flex>

                  <Flex justify="space-between" align="center">
                    <Text color="#64748B">Nilai Tukar (Kurs)</Text>
                    <Text fontWeight="600" color="#334155">
                      1 {transaction.destinationCurrency} = IDR{" "}
                      {(1 / transaction.exchangeRate).toLocaleString("id-ID", {
                        maximumFractionDigits: 2,
                      })}
                    </Text>
                  </Flex>

                  <Flex justify="space-between" align="center">
                    <Text color="#64748B">Metode & Kecepatan</Text>
                    <Text fontWeight="600" color="#334155">
                      {transaction.service === "BANK_TRANSFER" ? "Bank Transfer" : "E-Wallet"} (
                      {transaction.speed === "INSTANT" ? "Instan" : "Reguler"})
                    </Text>
                  </Flex>

                  <Flex justify="space-between" align="center">
                    <Text color="#64748B">Biaya Transfer</Text>
                    <Text fontWeight="600" color="#334155">
                      {formatIdr(transaction.transferFee)}
                    </Text>
                  </Flex>

                  <Box pt={3} borderTop="1px dashed #E2E8F0">
                    <Flex justify="space-between" align="center">
                      <Box>
                        <Text fontWeight="700" color="#172B4D">
                          Total Pembayaran
                        </Text>
                        <Text fontSize="11px" color="#94A3B8">
                          via {transaction.paymentBank.name}
                        </Text>
                      </Box>
                      <Text fontSize="17px" fontWeight="800" color="#269FEF">
                        {formatIdr(transaction.totalPayment)}
                      </Text>
                    </Flex>
                  </Box>

                  <Box pt={3} borderTop="1px solid #F1F5F9">
                    <Flex justify="space-between" align="center">
                      <Text fontWeight="700" color="#172B4D">
                        Penerima Akan Menerima
                      </Text>
                      <Text fontSize="18px" fontWeight="800" color="#16A34A">
                        {formatFx(transaction.receiveAmount, transaction.destinationCurrency)}
                      </Text>
                    </Flex>
                  </Box>
                </VStack>
              </Box>

              {/* Right Box: Rincian Penerima & Rekening Pembayaran */}
              <Box
                bg="#FFFFFF"
                p={{ base: 5, sm: 6 }}
                borderRadius="16px"
                border="1px solid #E7EDF5"
                boxShadow="0px 2px 8px rgba(15, 23, 42, 0.03)"
              >
                <HStack gap={2} mb={4} pb={3} borderBottom="1px solid #F1F5F9">
                  <User size={18} color="#269FEF" />
                  <Text fontSize="15px" fontWeight="700" color="#172B4D">
                    Informasi Penerima
                  </Text>
                </HStack>

                <VStack gap={3.5} align="stretch" fontSize="13px">
                  <Box>
                    <Text fontSize="12px" color="#64748B">
                      Nama Lengkap Penerima
                    </Text>
                    <Text fontSize="14px" fontWeight="700" color="#172B4D">
                      {transaction.recipient.fullName}
                    </Text>
                  </Box>

                  <Box>
                    <Text fontSize="12px" color="#64748B">
                      Bank Penerima
                    </Text>
                    <Text fontWeight="600" color="#172B4D">
                      {transaction.recipient.bankName}
                    </Text>
                  </Box>

                  <Box>
                    <Text fontSize="12px" color="#64748B">
                      Nomor Rekening
                    </Text>
                    <Text fontFamily="monospace" fontWeight="700" color="#334155">
                      {maskAccountNumber(transaction.recipient.accountNumber)}
                    </Text>
                  </Box>

                  <Box>
                    <Text fontSize="12px" color="#64748B">
                      Negara Tujuan
                    </Text>
                    <HStack gap={1.5} mt={0.5}>
                      <Text fontSize="16px">{transaction.destinationCountry.flagEmoji}</Text>
                      <Text fontWeight="600" color="#172B4D">
                        {transaction.destinationCountry.name} ({transaction.destinationCountry.code}
                        )
                      </Text>
                    </HStack>
                  </Box>

                  <Box>
                    <Text fontSize="12px" color="#64748B">
                      Tujuan Transaksi
                    </Text>
                    <Text fontWeight="600" color="#334155">
                      {transaction.recipient.transferPurpose.replace(/_/g, " ")}
                    </Text>
                  </Box>

                  {transaction.recipient.email && (
                    <Box>
                      <Text fontSize="12px" color="#64748B">
                        Email Penerima
                      </Text>
                      <Text color="#334155">{transaction.recipient.email}</Text>
                    </Box>
                  )}

                  {transaction.recipient.note && (
                    <Box>
                      <Text fontSize="12px" color="#64748B">
                        Catatan
                      </Text>
                      <Text color="#334155" fontStyle="italic">
                        &ldquo;{transaction.recipient.note}&rdquo;
                      </Text>
                    </Box>
                  )}
                </VStack>
              </Box>
            </SimpleGrid>

            {/* Payment Destination Account Card */}
            <Box
              bg="#FFFFFF"
              p={{ base: 5, sm: 6 }}
              borderRadius="16px"
              border="1px solid #E7EDF5"
              boxShadow="0px 2px 8px rgba(15, 23, 42, 0.03)"
            >
              <HStack gap={2} mb={3}>
                <Building2 size={18} color="#269FEF" />
                <Text fontSize="15px" fontWeight="700" color="#172B4D">
                  Rekening Tujuan Pembayaran Simulasi
                </Text>
              </HStack>
              <Text fontSize="13px" color="#64748B" mb={4}>
                Pada sistem riil, pembayaran ditransfer ke rekening virtual account berikut:
              </Text>

              <SimpleGrid
                columns={{ base: 1, sm: 3 }}
                gap={4}
                bg="#F8FAFC"
                p={4}
                borderRadius="12px"
              >
                <Box>
                  <Text fontSize="12px" color="#64748B">
                    Bank
                  </Text>
                  <Text fontSize="14px" fontWeight="700" color="#172B4D">
                    {transaction.paymentBank.name}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="12px" color="#64748B">
                    Nomor Rekening / VA
                  </Text>
                  <Text fontSize="14px" fontWeight="800" fontFamily="monospace" color="#1688DB">
                    {transaction.paymentBank.accountNumber}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="12px" color="#64748B">
                    Atas Nama
                  </Text>
                  <Text fontSize="13px" fontWeight="600" color="#334155">
                    {transaction.paymentBank.accountName}
                  </Text>
                </Box>
              </SimpleGrid>
            </Box>

            {/* Rating & Feedback Section */}
            <StarRating
              transactionId={transaction.id}
              initialRating={transaction.rating}
              initialComment={transaction.ratingComment}
            />

            {/* Bottom Actions */}
            <Flex justify="space-between" align="center" flexWrap="wrap" gap={3}>
              <Link href="/history" style={{ textDecoration: "none" }}>
                <SecondaryButton leftIcon={<ArrowLeft size={16} />}>
                  Kembali ke Riwayat
                </SecondaryButton>
              </Link>
              <Link href="/" style={{ textDecoration: "none" }}>
                <PrimaryButton leftIcon={<ExternalLink size={16} />}>Kirim Uang Lagi</PrimaryButton>
              </Link>
            </Flex>
          </VStack>
        )}
      </MainContainer>
    </AppShell>
  );
}
