"use client";

import { Box, Flex, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import * as React from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { AppShell, MainContainer, PageHeading } from "@/components/layout";
import {
  ConfirmationDialog,
  CurrencyInput,
  PrimaryButton,
  SecondaryButton,
  ServiceCard,
  StatusBadge,
  TransactionStepper,
  TransferSummary,
} from "@/components/common";

export default function DesignSystemShowcasePage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [sendAmount, setSendAmount] = React.useState("1,000,000");
  const [receiveAmount, setReceiveAmount] = React.useState("61.16");

  return (
    <AppShell>
      <MainContainer maxW="1080px">
        {/* Page Heading */}
        <PageHeading
          title="Kirim Uang ke Luar Negeri"
          subtitle="Simulasi pengiriman uang internasional cepat, murah, dan aman berlisensi resmi Bank Indonesia."
          actionSlot={
            <HStack gap={2}>
              <StatusBadge status="PROCESSING" />
            </HStack>
          }
        />

        {/* Stepper */}
        <TransactionStepper currentStep={1} />

        {/* Two-column Layout (Desktop: 2 columns, Mobile: 1 column) */}
        <SimpleGrid columns={{ base: 1, lg: 12 }} gap={8} alignContent="start">
          {/* Left Column: Interactive Input Cards & Service Selection (7 cols) */}
          <Box gridColumn={{ base: "span 1", lg: "span 7" }}>
            <VStack gap={4} align="stretch">
              {/* Sender Card (IDR) */}
              <CurrencyInput
                id="send-amount"
                label="Kamu mengirim"
                value={sendAmount}
                onChangeValue={setSendAmount}
                currencyCode="IDR"
                flag="🇮🇩"
                countryName="Indonesia"
                minAmount="IDR 100.000"
                maxAmount="IDR 100.000.000"
              />

              {/* Rate pill connector */}
              <Flex justify="center" my={-1}>
                <HStack
                  bg="#FFFFFF"
                  px={4}
                  py={1.5}
                  borderRadius="full"
                  border="1px solid #E7EDF5"
                  boxShadow="0px 2px 6px rgba(15, 23, 42, 0.04)"
                  fontSize="12px"
                  fontWeight="600"
                  color="#1688DB"
                  gap={1.5}
                >
                  <Sparkles size={14} color="#269FEF" />
                  <Text>Kurs Kompetitif: 1 USD = IDR 16.350,00</Text>
                </HStack>
              </Flex>

              {/* Recipient Card (FX) */}
              <CurrencyInput
                id="receive-amount"
                label="Penerima menerima"
                value={receiveAmount}
                onChangeValue={setReceiveAmount}
                currencyCode="USD"
                flag="🇺🇸"
                countryName="Amerika Serikat"
                isCurrencySelectable={true}
              />

              {/* Service & Speed Card */}
              <ServiceCard
                serviceType="BANK_TRANSFER"
                speed="REGULAR"
                feeAmountIdr={75000}
                estimatedArrival="3 hari kerja bank"
                onEdit={() =>
                  alert("Modal pemilihan layanan akan diintegrasikan pada modul kalkulator")
                }
              />

              {/* Guarantee alert */}
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
                <Box fontSize="13px" color="#0F6BB0" lineHeight="tall">
                  <Text fontWeight="700">Jaminan Uang Kembali 100%</Text>
                  <Text mt={0.5}>
                    Jika transfer Anda gagal diproses oleh sistem perbankan tujuan, seluruh dana
                    beserta biaya transfer akan dikembalikan utuh.
                  </Text>
                </Box>
              </Box>
            </VStack>
          </Box>

          {/* Right Column: Payment Summary & Next Action (5 cols) */}
          <Box gridColumn={{ base: "span 1", lg: "span 5" }}>
            <VStack gap={4} align="stretch" position={{ lg: "sticky" }} top={{ lg: "92px" }}>
              <TransferSummary
                sendAmountIdr={1000000}
                receiveAmountFx={61.16}
                currencyCode="USD"
                exchangeRate={0.00006116}
                transferFeeIdr={75000}
                discountIdr={15000}
                promoCode="TOPREMITHEMAT"
              />

              {/* Action Buttons */}
              <VStack gap={2.5} align="stretch">
                <PrimaryButton
                  size="lg"
                  isFullWidth
                  onClick={() => setIsDialogOpen(true)}
                  rightIcon={<ArrowRight size={18} />}
                >
                  Lanjutkan ke Penerima
                </PrimaryButton>

                <Link href="/history" style={{ textDecoration: "none" }}>
                  <SecondaryButton size="md" isFullWidth variant="subtle">
                    Lihat Riwayat Transaksi
                  </SecondaryButton>
                </Link>
              </VStack>

              {/* Security note */}
              <HStack justify="center" gap={1.5} color="#64748B" fontSize="12px">
                <CheckCircle2 size={14} color="#16A34A" />
                <Text>Simulasi transaksi aman & terenkripsi</Text>
              </HStack>
            </VStack>
          </Box>
        </SimpleGrid>

        {/* Accessible Confirmation Dialog Preview */}
        <ConfirmationDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={() => {
            setIsDialogOpen(false);
            alert("Dialog konfirmasi berhasil diverifikasi! Transaksi simulasi siap dilanjutkan.");
          }}
          recipientName="John Doe"
          recipientBank="Chase Bank"
          accountNumber="8839201948"
          destinationCountry="Amerika Serikat (US)"
          destinationCurrency="USD"
          receiveAmountFx={61.16}
          totalPaymentIdr={1060000}
        />
      </MainContainer>
    </AppShell>
  );
}
