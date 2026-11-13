"use client";

import { Box, Flex, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, ShieldCheck, Users } from "lucide-react";
import { AppShell, MainContainer, PageHeading } from "@/components/layout";
import {
  CurrencyInput,
  LoadingState,
  PrimaryButton,
  ServiceCard,
  StatusBadge,
  TransactionStepper,
  TransferSummary,
} from "@/components/common";
import { CountrySelectModal } from "./CountrySelectModal";
import { ServiceSpeedModal } from "./ServiceSpeedModal";
import { RateDisplayBanner } from "./RateDisplayBanner";
import { useCountries } from "@/hooks/useCountries";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { useTransferFees } from "@/hooks/useTransferFees";
import { useTransferCalculator } from "@/hooks/useTransferCalculator";
import { useTransferStore } from "@/store/transfer-store";
import type { Country } from "@/models/country";
import type { TransferServiceType, TransferSpeedType } from "@/models/transfer";

export function TransferCalculatorView() {
  const router = useRouter();

  // Zustand Store
  const store = useTransferStore();

  // Server Data: Countries
  const { countries, isLoading: isCountriesLoading } = useCountries();

  // Currently selected destination country derived cleanly from store and loaded countries
  const selectedCountry = React.useMemo<Country>(() => {
    const found = countries.find((c) => c.code === store.destinationCountryCode);
    return (
      found || {
        code: "US",
        name: "Amerika Serikat",
        currency: { code: "USD", name: "US Dollar", symbol: "$" },
        flagEmoji: "🇺🇸",
      }
    );
  }, [countries, store.destinationCountryCode]);

  // Server Data: Exchange Rate for selected currency
  const {
    rate: exchangeRate,
    inverseRate,
    lastUpdated,
    isLoading: isRateLoading,
  } = useExchangeRate(selectedCountry.currency.code);

  // Transfer Service and Speed State
  const [serviceType, setServiceType] = React.useState<TransferServiceType>(store.serviceType);
  const [speed, setSpeed] = React.useState<TransferSpeedType>(store.speed);

  // Server Data: Transfer Fees
  const { feeConfig, allFees } = useTransferFees(serviceType, speed);

  // Two-way Currency Calculator Engine
  const {
    sendAmountIdr,
    receiveAmountFx,
    sendInputStr,
    receiveInputStr,
    handleSendAmountChange,
    handleReceiveAmountChange,
    isValid,
    validationError,
  } = useTransferCalculator({
    initialSendIdr: store.sendAmountIdr > 0 ? store.sendAmountIdr : 1000000,
    exchangeRate: exchangeRate > 0 ? exchangeRate : store.exchangeRate,
    currencyCode: selectedCountry.currency.code,
  });

  // Modals state
  const [isCountryModalOpen, setIsCountryModalOpen] = React.useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = React.useState(false);

  // Topremit Tab switcher: "Satu penerima" vs "Banyak penerima"
  const [activeTab, setActiveTab] = React.useState<"single" | "multiple">("single");

  // Handle Country Selection
  const handleSelectCountry = (country: Country) => {
    store.setDestination(
      country.code,
      country.name,
      country.currency.code,
      country.flagEmoji,
      exchangeRate
    );
  };

  // Handle Service & Speed Confirmation
  const handleConfirmServiceSpeed = (
    newService: TransferServiceType,
    newSpeed: TransferSpeedType
  ) => {
    setServiceType(newService);
    setSpeed(newSpeed);
    const matchedFee = allFees.find((f) => f.serviceType === newService && f.speed === newSpeed);
    const feeVal = matchedFee ? matchedFee.feeIdr : 75000;
    store.setServiceAndSpeed(newService, newSpeed, feeVal);
  };

  // Handle Navigation to Recipient Step
  const handleContinue = () => {
    if (!isValid) return;

    // Persist finalized calculator values to Zustand store
    store.setDestination(
      selectedCountry.code,
      selectedCountry.name,
      selectedCountry.currency.code,
      selectedCountry.flagEmoji,
      exchangeRate
    );
    store.setAmounts(sendAmountIdr, receiveAmountFx);
    store.setServiceAndSpeed(serviceType, speed, feeConfig.feeIdr);
    store.setStep(2);

    // Navigate to recipient page
    router.push("/recipient");
  };

  if (isCountriesLoading) {
    return (
      <AppShell>
        <MainContainer>
          <LoadingState message="Memuat kalkulator kurs dan negara tujuan..." />
        </MainContainer>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <MainContainer maxW="1080px">
        {/* Page Heading matching prompt: "How much are you sending?" */}
        <PageHeading
          title="Berapa banyak yang ingin kamu kirim?"
          subtitle="Simulasi pengiriman uang internasional ke luar negeri dengan kurs terbaik dan biaya transparan."
          actionSlot={<StatusBadge status="PROCESSING" />}
        />

        {/* Stepper: Step 1 active */}
        <TransactionStepper currentStep={1} />

        {/* Top Tab Mode: Satu penerima vs Banyak penerima (Topremit Reference) */}
        <Flex justify="center" mb={6}>
          <HStack
            bg="#FFFFFF"
            p={1}
            borderRadius="12px"
            border="1px solid #E7EDF5"
            boxShadow="0px 1px 3px rgba(15, 23, 42, 0.04)"
            gap={1}
          >
            <Box
              as="button"
              px={5}
              py={2}
              borderRadius="10px"
              fontSize="13px"
              fontWeight="700"
              bg={activeTab === "single" ? "#269FEF" : "transparent"}
              color={activeTab === "single" ? "#FFFFFF" : "#64748B"}
              cursor="pointer"
              transition="all 0.15s ease"
              onClick={() => setActiveTab("single")}
              outline="none"
              border="none"
            >
              Satu penerima
            </Box>

            <Box
              as="button"
              px={5}
              py={2}
              borderRadius="10px"
              fontSize="13px"
              fontWeight="600"
              bg={activeTab === "multiple" ? "#269FEF" : "transparent"}
              color={activeTab === "multiple" ? "#FFFFFF" : "#94A3B8"}
              cursor="pointer"
              transition="all 0.15s ease"
              onClick={() => {
                alert(
                  "Mode kirim ke banyak penerima (Batch Transfer) akan tersedia di rilis berikutnya."
                );
              }}
              outline="none"
              border="none"
              display="inline-flex"
              alignItems="center"
              gap={1.5}
            >
              <Users size={14} />
              <span>Banyak penerima</span>
            </Box>
          </HStack>
        </Flex>

        {/* Main Composition: 2 Columns on Desktop, Single Column on Mobile */}
        <SimpleGrid columns={{ base: 1, lg: 12 }} gap={8} alignContent="start">
          {/* Left Column: Two-way Input Cards & Service Speed (7 cols) */}
          <Box gridColumn={{ base: "span 1", lg: "span 7" }}>
            <VStack gap={4} align="stretch">
              {/* Send Amount Input (IDR) */}
              <CurrencyInput
                id="send-amount-idr"
                label="Kamu mengirim"
                value={sendInputStr}
                onChangeValue={handleSendAmountChange}
                currencyCode="IDR"
                flag="🇮🇩"
                countryName="Indonesia"
                minAmount="IDR 100.000"
                maxAmount="IDR 100.000.000"
                error={validationError || undefined}
              />

              {/* Exchange Rate Banner */}
              <RateDisplayBanner
                currencyCode={selectedCountry.currency.code}
                inverseRate={inverseRate}
                lastUpdated={lastUpdated}
              />

              {/* Receive Amount Input (Destination Currency) */}
              <CurrencyInput
                id="receive-amount-fx"
                label="Penerima menerima"
                value={receiveInputStr}
                onChangeValue={handleReceiveAmountChange}
                currencyCode={selectedCountry.currency.code}
                flag={selectedCountry.flagEmoji}
                countryName={selectedCountry.name}
                isCurrencySelectable={true}
                onSelectCurrency={() => setIsCountryModalOpen(true)}
              />

              {/* Service & Speed Card */}
              <ServiceCard
                serviceType={serviceType}
                speed={speed}
                feeAmountIdr={feeConfig.feeIdr}
                estimatedArrival={feeConfig.estimatedArrival}
                onEdit={() => setIsServiceModalOpen(true)}
                isClickable={true}
              />

              {/* Informational Guarantee Card */}
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
                    Jika transfer Anda gagal diproses oleh sistem perbankan di{" "}
                    {selectedCountry.name}, seluruh dana beserta biaya transfer akan dikembalikan
                    utuh ke rekening Anda.
                  </Text>
                </Box>
              </Box>
            </VStack>
          </Box>

          {/* Right Column: Payment Breakdown & Action Button (5 cols) */}
          <Box gridColumn={{ base: "span 1", lg: "span 5" }}>
            <VStack gap={4} align="stretch" position={{ lg: "sticky" }} top={{ lg: "92px" }}>
              <TransferSummary
                sendAmountIdr={sendAmountIdr}
                receiveAmountFx={receiveAmountFx}
                currencyCode={selectedCountry.currency.code}
                exchangeRate={exchangeRate}
                transferFeeIdr={feeConfig.feeIdr}
                discountIdr={store.discountIdr}
                promoCode={store.appliedPromoCode}
              />

              {/* Continue Button */}
              <PrimaryButton
                size="lg"
                isFullWidth
                disabled={!isValid || isRateLoading}
                isLoading={isRateLoading}
                onClick={handleContinue}
                rightIcon={<ArrowRight size={18} />}
              >
                Lanjutkan ke Penerima
              </PrimaryButton>

              {/* Validation helper alert if invalid */}
              {validationError && (
                <Text fontSize="12px" color="#DC2626" textAlign="center" fontWeight="500">
                  {validationError}
                </Text>
              )}

              {/* Security trust badge */}
              <HStack justify="center" gap={1.5} color="#64748B" fontSize="12px">
                <CheckCircle2 size={14} color="#16A34A" />
                <Text>Terdaftar & Diawasi Bank Indonesia</Text>
              </HStack>
            </VStack>
          </Box>
        </SimpleGrid>

        {/* Modal: Country Selector */}
        <CountrySelectModal
          isOpen={isCountryModalOpen}
          onClose={() => setIsCountryModalOpen(false)}
          onSelectCountry={handleSelectCountry}
          countries={countries}
          selectedCountryCode={selectedCountry.code}
        />

        {/* Modal: Service & Speed Selection */}
        <ServiceSpeedModal
          isOpen={isServiceModalOpen}
          onClose={() => setIsServiceModalOpen(false)}
          selectedService={serviceType}
          selectedSpeed={speed}
          allFees={allFees}
          onConfirm={handleConfirmServiceSpeed}
          countryName={selectedCountry.name}
        />
      </MainContainer>
    </AppShell>
  );
}
