"use client";

import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { ArrowLeftRight, Clock, Edit2, User } from "lucide-react";
import type { TransferDraftState } from "@/store/transfer-store";

export interface TransferReviewCardProps {
  draft: TransferDraftState;
}

export function TransferReviewCard({ draft }: TransferReviewCardProps) {
  const recipient = draft.recipient;

  const formatIdr = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  const formatFx = (val: number, code: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      maximumFractionDigits: 2,
    }).format(val);

  const inverseRate = draft.exchangeRate > 0 ? 1 / draft.exchangeRate : 0;

  return (
    <VStack gap={4} align="stretch">
      {/* SECTION 1: Detail Pengiriman & Kurs */}
      <Box
        bg="#FFFFFF"
        p={{ base: 5, sm: 6 }}
        borderRadius="16px"
        border="1px solid #E7EDF5"
        boxShadow="0px 2px 6px rgba(15, 23, 42, 0.03)"
      >
        <Flex justify="space-between" align="center" mb={4} pb={3} borderBottom="1px solid #F1F5F9">
          <HStack gap={2.5}>
            <Box p={2} borderRadius="8px" bg="#EAF6FF" color="#269FEF">
              <ArrowLeftRight size={18} />
            </Box>
            <Box>
              <Text fontSize="15px" fontWeight="700" color="#172B4D">
                Detail Pengiriman & Kurs
              </Text>
              <Text fontSize="12px" color="#64748B">
                Kalkulasi nominal dan rincian biaya transfer
              </Text>
            </Box>
          </HStack>

          <Link href="/" style={{ textDecoration: "none" }}>
            <HStack
              gap={1}
              color="#269FEF"
              fontSize="13px"
              fontWeight="600"
              p="6px 10px"
              borderRadius="8px"
              _hover={{ bg: "#EAF6FF" }}
            >
              <Edit2 size={13} />
              <Text>Ubah</Text>
            </HStack>
          </Link>
        </Flex>

        <VStack gap={3} align="stretch" fontSize="13px">
          <Flex justify="space-between" align="center">
            <Text color="#64748B">Negara Tujuan</Text>
            <HStack gap={1.5}>
              <Text fontSize="16px">{draft.destinationFlag}</Text>
              <Text fontWeight="700" color="#172B4D">
                {draft.destinationCountryName} ({draft.destinationCurrency})
              </Text>
            </HStack>
          </Flex>

          <Flex justify="space-between" align="center">
            <Text color="#64748B">Nominal Pengiriman (Kamu Mengirim)</Text>
            <Text fontWeight="700" color="#172B4D">
              {formatIdr(draft.sendAmountIdr)}
            </Text>
          </Flex>

          <Flex justify="space-between" align="center">
            <Text color="#64748B">Nilai Tukar (Kurs)</Text>
            <Text fontWeight="600" color="#1688DB">
              1 {draft.destinationCurrency} = {formatIdr(inverseRate)}
            </Text>
          </Flex>

          <Flex justify="space-between" align="center">
            <Text color="#64748B">Penerima Menerima</Text>
            <Text fontWeight="800" color="#16A34A" fontSize="15px">
              {formatFx(draft.receiveAmountFx, draft.destinationCurrency)}
            </Text>
          </Flex>

          <Flex justify="space-between" align="center">
            <Text color="#64748B">Layanan & Mode</Text>
            <HStack gap={1.5} color="#172B4D" fontWeight="600">
              <Clock size={14} color="#64748B" />
              <Text>
                {draft.serviceType === "BANK_TRANSFER" ? "Bank Transfer" : "E-Wallet"} •{" "}
                {draft.speed === "INSTANT" ? "Instan" : "Normal"}
              </Text>
            </HStack>
          </Flex>

          <Flex justify="space-between" align="center">
            <Text color="#64748B">Biaya Pengiriman</Text>
            <Text fontWeight="600" color="#172B4D">
              {formatIdr(draft.transferFeeIdr)}
            </Text>
          </Flex>

          {draft.discountIdr > 0 && (
            <Flex justify="space-between" align="center" color="#16A34A">
              <Text fontWeight="600">Diskon Promo ({draft.appliedPromoCode})</Text>
              <Text fontWeight="700">-{formatIdr(draft.discountIdr)}</Text>
            </Flex>
          )}
        </VStack>
      </Box>

      {/* SECTION 2: Data Rekening Penerima */}
      <Box
        bg="#FFFFFF"
        p={{ base: 5, sm: 6 }}
        borderRadius="16px"
        border="1px solid #E7EDF5"
        boxShadow="0px 2px 6px rgba(15, 23, 42, 0.03)"
      >
        <Flex justify="space-between" align="center" mb={4} pb={3} borderBottom="1px solid #F1F5F9">
          <HStack gap={2.5}>
            <Box p={2} borderRadius="8px" bg="#EAF6FF" color="#269FEF">
              <User size={18} />
            </Box>
            <Box>
              <Text fontSize="15px" fontWeight="700" color="#172B4D">
                Data Penerima
              </Text>
              <Text fontSize="12px" color="#64748B">
                Informasi rekening penerima dana di luar negeri
              </Text>
            </Box>
          </HStack>

          <Link href="/recipient" style={{ textDecoration: "none" }}>
            <HStack
              gap={1}
              color="#269FEF"
              fontSize="13px"
              fontWeight="600"
              p="6px 10px"
              borderRadius="8px"
              _hover={{ bg: "#EAF6FF" }}
            >
              <Edit2 size={13} />
              <Text>Ubah</Text>
            </HStack>
          </Link>
        </Flex>

        <VStack gap={3} align="stretch" fontSize="13px">
          <Flex justify="space-between" align="center">
            <Text color="#64748B">Nama Bank Penerima</Text>
            <Text fontWeight="700" color="#172B4D">
              {recipient?.bankName || "-"}
            </Text>
          </Flex>

          <Flex justify="space-between" align="center">
            <Text color="#64748B">Nomor Rekening</Text>
            <Text fontWeight="700" color="#172B4D" fontFamily="monospace" fontSize="14px">
              {recipient?.accountNumber || "-"}
            </Text>
          </Flex>

          <Flex justify="space-between" align="center">
            <Text color="#64748B">Nama Lengkap</Text>
            <Text fontWeight="700" color="#172B4D">
              {recipient?.fullName || "-"}
            </Text>
          </Flex>

          <Flex justify="space-between" align="center">
            <Text color="#64748B">Tujuan Transfer</Text>
            <Text fontWeight="600" color="#172B4D">
              {recipient?.transferPurpose?.replace(/_/g, " ") || "-"}
            </Text>
          </Flex>

          {recipient?.email && (
            <Flex justify="space-between" align="center">
              <Text color="#64748B">Email Notifikasi</Text>
              <Text fontWeight="500" color="#172B4D">
                {recipient.email}
              </Text>
            </Flex>
          )}

          {recipient?.note && (
            <Flex justify="space-between" align="start">
              <Text color="#64748B">Catatan</Text>
              <Text fontWeight="500" color="#172B4D" maxW="300px" textAlign="right">
                {recipient.note}
              </Text>
            </Flex>
          )}
        </VStack>
      </Box>
    </VStack>
  );
}
