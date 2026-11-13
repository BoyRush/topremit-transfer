"use client";

import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, UserCheck } from "lucide-react";
import { AppShell, MainContainer, PageHeading } from "@/components/layout";
import { SecondaryButton, TransactionStepper, TransferSummary } from "@/components/common";
import { useTransferStore } from "@/store/transfer-store";

export default function RecipientPlaceholderPage() {
  const store = useTransferStore();

  return (
    <AppShell>
      <MainContainer maxW="900px">
        <PageHeading
          title="Siapa yang kamu tuju?"
          subtitle="Isi informasi data rekening penerima di negara tujuan."
          backHref="/"
          backLabel="Kembali ke Kalkulator"
        />

        {/* Stepper: Step 2 */}
        <TransactionStepper currentStep={2} />

        <SimpleGrid columns={{ base: 1, md: 12 }} gap={8} alignContent="start">
          {/* Left Column: Confirmation of Passed Calculator Data (7 cols) */}
          <Box gridColumn={{ base: "span 1", md: "span 7" }}>
            <VStack gap={4} align="stretch">
              <Box
                bg="#FFFFFF"
                p={6}
                borderRadius="16px"
                border="1px solid #E7EDF5"
                boxShadow="0px 2px 6px rgba(15, 23, 42, 0.03)"
              >
                <HStack gap={3} mb={4}>
                  <Box
                    p={2.5}
                    borderRadius="10px"
                    bg="#EAF6FF"
                    color="#269FEF"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <UserCheck size={22} />
                  </Box>
                  <Box>
                    <Text fontSize="16px" fontWeight="700" color="#172B4D">
                      Data Transfer Terverifikasi
                    </Text>
                    <Text fontSize="12px" color="#64748B">
                      Draft kalkulasi berhasil disimpan di Zustand State
                    </Text>
                  </Box>
                </HStack>

                <VStack
                  gap={3}
                  align="stretch"
                  fontSize="13px"
                  bg="#F5F8FC"
                  p={4}
                  borderRadius="12px"
                >
                  <HStack justify="space-between">
                    <Text color="#64748B">Negara Tujuan:</Text>
                    <Text fontWeight="700" color="#172B4D">
                      {store.destinationFlag} {store.destinationCountryName} (
                      {store.destinationCurrency})
                    </Text>
                  </HStack>

                  <HStack justify="space-between">
                    <Text color="#64748B">Kamu Mengirim:</Text>
                    <Text fontWeight="700" color="#172B4D">
                      IDR {store.sendAmountIdr.toLocaleString("id-ID")}
                    </Text>
                  </HStack>

                  <HStack justify="space-between">
                    <Text color="#64748B">Penerima Menerima:</Text>
                    <Text fontWeight="800" color="#16A34A">
                      {store.destinationCurrency} {store.receiveAmountFx.toLocaleString("en-US")}
                    </Text>
                  </HStack>

                  <HStack justify="space-between">
                    <Text color="#64748B">Layanan:</Text>
                    <Text fontWeight="600" color="#172B4D">
                      {store.serviceType === "BANK_TRANSFER" ? "Bank Transfer" : "E-Wallet"} (
                      {store.speed === "INSTANT" ? "Instan" : "Normal"})
                    </Text>
                  </HStack>
                </VStack>

                <Box mt={5} p={4} borderRadius="10px" bg="#DCFCE7" border="1px solid #BBF7D0">
                  <HStack gap={2} color="#15803D" fontSize="13px">
                    <CheckCircle2 size={16} />
                    <Text fontWeight="600">
                      Modul A (Kalkulator) Selesai! Siap untuk Phase 4: Form Data Penerima.
                    </Text>
                  </HStack>
                </Box>

                <HStack gap={3} mt={6}>
                  <Link href="/" style={{ textDecoration: "none", flex: 1 }}>
                    <SecondaryButton isFullWidth leftIcon={<ArrowLeft size={16} />}>
                      Ubah Nominal
                    </SecondaryButton>
                  </Link>
                </HStack>
              </Box>
            </VStack>
          </Box>

          {/* Right Column: Mini Summary (5 cols) */}
          <Box gridColumn={{ base: "span 1", md: "span 5" }}>
            <TransferSummary
              sendAmountIdr={store.sendAmountIdr}
              receiveAmountFx={store.receiveAmountFx}
              currencyCode={store.destinationCurrency}
              exchangeRate={store.exchangeRate}
              transferFeeIdr={store.transferFeeIdr}
              discountIdr={store.discountIdr}
            />
          </Box>
        </SimpleGrid>
      </MainContainer>
    </AppShell>
  );
}
