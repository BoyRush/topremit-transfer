"use client";

import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Building2, ChevronDown, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { AppShell, MainContainer, PageHeading } from "@/components/layout";
import {
  FormField,
  PrimaryButton,
  SecondaryButton,
  TransactionStepper,
  TransferSummary,
} from "@/components/common";
import { BankSelectModal } from "./BankSelectModal";
import { useTransferStore } from "@/store/transfer-store";
import { useDestinationBanks } from "@/hooks/useDestinationBanks";
import { useTransferForm } from "@/hooks/useTransferForm";
import { useRouteGuard } from "@/hooks/useRouteGuard";
import { useT } from "@/store/lang-store";
import { LoadingState } from "@/components/common";
import { TRANSFER_PURPOSE_OPTIONS } from "@/models/recipient";

export function RecipientFormView() {
  const router = useRouter();
  const store = useTransferStore();
  const T = useT();

  // Route guard: requires step 1 (calculator completed: amount > 0 & country set)
  const { isAllowed, isChecking } = useRouteGuard({ requiredStep: 1, redirectTo: "/" });

  const [isBankModalOpen, setIsBankModalOpen] = React.useState(false);

  // Fetch destination banks for current selected corridor
  const { banks } = useDestinationBanks(store.destinationCountryCode);

  // Form Controller hook
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    onSubmit,
    noteCharCount,
    noteRemainingChars,
    handleSelectBank,
    selectedBankCode,
    selectedBankName,
    setValue,
  } = useTransferForm({
    onSuccess: () => {
      router.push("/review");
    },
  });

  // Show loading spinner while hydration check runs
  if (isChecking || !isAllowed) {
    return (
      <AppShell>
        <MainContainer maxW="1080px">
          <LoadingState message="Memeriksa sesi transfer..." />
        </MainContainer>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <MainContainer maxW="1080px">
        {/* Page Heading: "Who are you sending to?" */}
        <PageHeading
          title={T("recipient.title")}
          subtitle={T("recipient.subtitle")}
          backHref="/"
          backLabel={T("recipient.back")}
        />

        {/* Stepper: Step 2 active */}
        <TransactionStepper currentStep={2} />

        <SimpleGrid columns={{ base: 1, lg: 12 }} gap={8} alignContent="start">
          {/* Left Column: Form Fields (7 cols) */}
          <Box gridColumn={{ base: "span 1", lg: "span 7" }}>
            <Box
              as="form"
              onSubmit={onSubmit}
              bg="#FFFFFF"
              p={{ base: 5, sm: 7 }}
              borderRadius="16px"
              border="1px solid #E7EDF5"
              boxShadow="0px 2px 6px rgba(15, 23, 42, 0.03)"
            >
              <HStack gap={2.5} mb={5} pb={3} borderBottom="1px solid #F1F5F9">
                <Box
                  p={2}
                  borderRadius="8px"
                  bg="#EAF6FF"
                  color="#269FEF"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <User size={18} />
                </Box>
                <Box>
                  <Text fontSize="15px" fontWeight="700" color="#172B4D">
                    Data Rekening Penerima
                  </Text>
                  <Text fontSize="12px" color="#64748B">
                    Tujuan: {store.destinationFlag} {store.destinationCountryName} (
                    {store.destinationCurrency})
                  </Text>
                </Box>
              </HStack>

              <VStack gap={1} align="stretch">
                {/* 1. Bank Name Field (Searchable Select) */}
                <FormField
                  id="bank-name-field"
                  label="Nama Bank Penerima"
                  isRequired
                  error={errors.bankName?.message}
                  helperText="Pilih bank lokal resmi di negara penerima"
                >
                  <button
                    type="button"
                    onClick={() => setIsBankModalOpen(true)}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      backgroundColor: "#FFFFFF",
                      border: `1.5px solid ${errors.bankName ? "#DC2626" : "#E7EDF5"}`,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      textAlign: "left",
                      outline: "none",
                    }}
                  >
                    <HStack gap={2.5}>
                      <Building2 size={18} color="#64748B" />
                      <Text
                        fontSize="14px"
                        fontWeight={selectedBankName ? "600" : "400"}
                        color={selectedBankName ? "#172B4D" : "#94A3B8"}
                      >
                        {selectedBankName || "Pilih Bank Penerima..."}
                      </Text>
                    </HStack>
                    <ChevronDown size={18} color="#64748B" />
                  </button>
                </FormField>

                {/* 2. Account Number Field (Digits only, preserves leading zeros) */}
                <FormField
                  id="account-number"
                  label="Nomor Rekening"
                  isRequired
                  error={errors.accountNumber?.message}
                  helperText="Hanya berisi digit angka. Angka nol di depan tetap tersimpan aman."
                >
                  <input
                    id="account-number"
                    type="text"
                    inputMode="numeric"
                    placeholder="Contoh: 0192837482"
                    {...register("accountNumber", {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        // Strictly enforce numbers only, preserve leading zeros
                        const filtered = e.target.value.replace(/\D/g, "");
                        setValue("accountNumber", filtered, { shouldValidate: true });
                      },
                    })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: `1.5px solid ${errors.accountNumber ? "#DC2626" : "#E7EDF5"}`,
                      outline: "none",
                      fontSize: "15px",
                      fontFamily: "monospace",
                      fontWeight: "600",
                      color: "#172B4D",
                      backgroundColor: "#FFFFFF",
                      transition: "border-color 0.15s ease",
                    }}
                  />
                </FormField>

                {/* 3. Full Name Field (Required, trimmed) */}
                <FormField
                  id="full-name"
                  label="Nama Lengkap Penerima"
                  isRequired
                  error={errors.fullName?.message}
                  helperText="Sesuai nama yang tertera di buku tabungan / rekening bank penerima"
                >
                  <input
                    id="full-name"
                    type="text"
                    placeholder="Contoh: Michael Alexander Smith"
                    {...register("fullName")}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: `1.5px solid ${errors.fullName ? "#DC2626" : "#E7EDF5"}`,
                      outline: "none",
                      fontSize: "14px",
                      color: "#172B4D",
                      backgroundColor: "#FFFFFF",
                      transition: "border-color 0.15s ease",
                    }}
                  />
                </FormField>

                {/* 4. Transfer Purpose Field (Required Select) */}
                <FormField
                  id="transfer-purpose"
                  label="Tujuan Pengiriman Uang"
                  isRequired
                  error={errors.transferPurpose?.message}
                >
                  <select
                    id="transfer-purpose"
                    {...register("transferPurpose")}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: `1.5px solid ${errors.transferPurpose ? "#DC2626" : "#E7EDF5"}`,
                      outline: "none",
                      fontSize: "14px",
                      color: "#172B4D",
                      backgroundColor: "#FFFFFF",
                      cursor: "pointer",
                      transition: "border-color 0.15s ease",
                    }}
                  >
                    {TRANSFER_PURPOSE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </FormField>

                {/* 5. Email Field (Optional, valid format) */}
                <FormField
                  id="recipient-email"
                  label="Email Penerima"
                  isRequired={false}
                  error={errors.email?.message}
                  helperText="Opsional. Notifikasi status kiriman akan dikirimkan ke email ini."
                >
                  <input
                    id="recipient-email"
                    type="email"
                    placeholder="nama@email.com (opsional)"
                    {...register("email")}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: `1.5px solid ${errors.email ? "#DC2626" : "#E7EDF5"}`,
                      outline: "none",
                      fontSize: "14px",
                      color: "#172B4D",
                      backgroundColor: "#FFFFFF",
                      transition: "border-color 0.15s ease",
                    }}
                  />
                </FormField>

                {/* 6. Note Field (Optional, max 255 chars with live counter) */}
                <FormField
                  id="transfer-note"
                  label="Catatan Transfer"
                  isRequired={false}
                  error={errors.note?.message}
                  helperText={`Tersisa ${noteRemainingChars} karakter`}
                  charCounter={{ current: noteCharCount, max: 255 }}
                >
                  <textarea
                    id="transfer-note"
                    rows={3}
                    maxLength={255}
                    placeholder="Tulis catatan tambahan untuk penerima (maks. 255 karakter)..."
                    {...register("note")}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: `1.5px solid ${errors.note ? "#DC2626" : "#E7EDF5"}`,
                      outline: "none",
                      fontSize: "14px",
                      color: "#172B4D",
                      backgroundColor: "#FFFFFF",
                      resize: "vertical",
                      fontFamily: "var(--font-inter), sans-serif",
                      transition: "border-color 0.15s ease",
                    }}
                  />
                </FormField>

                {/* Action Buttons */}
                <HStack gap={3} pt={4} mt={2}>
                  <Link href="/" style={{ textDecoration: "none", flex: 1 }}>
                    <SecondaryButton isFullWidth leftIcon={<ArrowLeft size={16} />}>
                      Kembali
                    </SecondaryButton>
                  </Link>

                  <PrimaryButton
                    type="submit"
                    isFullWidth
                    isLoading={isSubmitting}
                    disabled={!isValid || !selectedBankCode}
                    rightIcon={<ArrowRight size={16} />}
                    style={{ flex: 1.5 }}
                  >
                    Lanjutkan ke Review
                  </PrimaryButton>
                </HStack>
              </VStack>
            </Box>
          </Box>

          {/* Right Column: Transfer Breakdown Summary (5 cols) */}
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
              />

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
                  <Text fontWeight="700">Verifikasi Rekening Real-Time</Text>
                  <Text mt={0.5}>
                    Data penerima akan divalidasi ke bank tujuan secara otomatis sebelum dana
                    diproses.
                  </Text>
                </Box>
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>

        {/* Searchable Bank Modal */}
        <BankSelectModal
          isOpen={isBankModalOpen}
          onClose={() => setIsBankModalOpen(false)}
          banks={banks}
          selectedBankCode={selectedBankCode}
          onSelectBank={handleSelectBank}
          countryName={store.destinationCountryName}
        />
      </MainContainer>
    </AppShell>
  );
}
