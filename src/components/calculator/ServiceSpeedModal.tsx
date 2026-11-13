"use client";

import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import * as React from "react";
import { Building2, Check, Clock, Wallet, Zap } from "lucide-react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { PrimaryButton } from "@/components/common";
import type { FeeConfig, TransferServiceType, TransferSpeedType } from "@/models/transfer";

export interface ServiceSpeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: TransferServiceType;
  selectedSpeed: TransferSpeedType;
  allFees: FeeConfig[];
  onConfirm: (service: TransferServiceType, speed: TransferSpeedType) => void;
  countryName?: string;
}

function ServiceSpeedModalContent({
  onClose,
  selectedService,
  selectedSpeed,
  allFees,
  onConfirm,
  countryName = "negara tujuan",
}: Omit<ServiceSpeedModalProps, "isOpen">) {
  const [tempService, setTempService] = React.useState<TransferServiceType>(selectedService);
  const [tempSpeed, setTempSpeed] = React.useState<TransferSpeedType>(selectedSpeed);

  const formatIdr = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  // Available speeds for selected service
  const serviceFees = allFees.filter((f) => f.serviceType === tempService);

  return (
    <DialogContent style={{ maxWidth: "500px" }}>
      <DialogCloseTrigger />

      <DialogHeader pb={2}>
        <DialogTitle fontSize="18px" fontWeight="800" color="#172B4D">
          Pilih layanan dan mode pengiriman
        </DialogTitle>
      </DialogHeader>

      <DialogBody pt={2} pb={4}>
        {/* Section: Layanan */}
        <Box mb={5}>
          <Text fontSize="13px" fontWeight="700" color="#64748B" mb={2}>
            Layanan
          </Text>

          <HStack gap={3}>
            {/* Bank Transfer Option */}
            <Box
              flex={1}
              p={3.5}
              borderRadius="12px"
              border="2px solid"
              borderColor={tempService === "BANK_TRANSFER" ? "#269FEF" : "#E7EDF5"}
              bg={tempService === "BANK_TRANSFER" ? "#EAF6FF" : "#FFFFFF"}
              cursor="pointer"
              transition="all 0.15s ease"
              onClick={() => setTempService("BANK_TRANSFER")}
              display="flex"
              alignItems="center"
              gap={2.5}
            >
              <Box
                p={2}
                borderRadius="8px"
                bg={tempService === "BANK_TRANSFER" ? "#269FEF" : "#F5F8FC"}
                color={tempService === "BANK_TRANSFER" ? "#FFFFFF" : "#64748B"}
              >
                <Building2 size={18} />
              </Box>
              <Text
                fontSize="14px"
                fontWeight="700"
                color={tempService === "BANK_TRANSFER" ? "#1688DB" : "#172B4D"}
              >
                Bank Transfer
              </Text>
            </Box>

            {/* E-Wallet Option */}
            <Box
              flex={1}
              p={3.5}
              borderRadius="12px"
              border="2px solid"
              borderColor={tempService === "E_WALLET" ? "#269FEF" : "#E7EDF5"}
              bg={tempService === "E_WALLET" ? "#EAF6FF" : "#FFFFFF"}
              cursor="pointer"
              transition="all 0.15s ease"
              onClick={() => setTempService("E_WALLET")}
              display="flex"
              alignItems="center"
              gap={2.5}
            >
              <Box
                p={2}
                borderRadius="8px"
                bg={tempService === "E_WALLET" ? "#269FEF" : "#F5F8FC"}
                color={tempService === "E_WALLET" ? "#FFFFFF" : "#64748B"}
              >
                <Wallet size={18} />
              </Box>
              <Text
                fontSize="14px"
                fontWeight="700"
                color={tempService === "E_WALLET" ? "#1688DB" : "#172B4D"}
              >
                E-Wallet
              </Text>
            </Box>
          </HStack>

          <Text fontSize="12px" color="#64748B" mt={2} lineHeight="shorter">
            {tempService === "BANK_TRANSFER"
              ? `Kirim uang langsung ke rekening bank penerima via jaringan kliring lokal di ${countryName}.`
              : `Kirim uang langsung ke akun dompet digital penerima yang didukung di ${countryName}.`}
          </Text>
        </Box>

        {/* Section: Mode Pengiriman */}
        <Box mb={4}>
          <Text fontSize="13px" fontWeight="700" color="#64748B" mb={2}>
            Mode pengiriman
          </Text>

          <VStack gap={2.5} align="stretch">
            {serviceFees.map((fee) => {
              const isSelected = tempSpeed === fee.speed;
              const isInstant = fee.speed === "INSTANT";

              return (
                <Box
                  key={fee.speed}
                  p={4}
                  borderRadius="14px"
                  border="2px solid"
                  borderColor={isSelected ? "#269FEF" : "#E7EDF5"}
                  bg={isSelected ? "#F0F8FF" : "#FFFFFF"}
                  cursor="pointer"
                  transition="all 0.15s ease"
                  onClick={() => setTempSpeed(fee.speed)}
                  _hover={{ borderColor: "#269FEF" }}
                >
                  <Flex justify="space-between" align="center" mb={1}>
                    <HStack gap={2}>
                      {isInstant ? (
                        <Zap size={16} color="#269FEF" fill="#269FEF" />
                      ) : (
                        <Clock size={16} color="#64748B" />
                      )}
                      <Text fontSize="15px" fontWeight="700" color="#172B4D">
                        {isInstant ? "Instan" : "Normal"}
                      </Text>
                    </HStack>

                    <Text fontSize="15px" fontWeight="800" color="#172B4D">
                      {formatIdr(fee.feeIdr)}
                    </Text>
                  </Flex>

                  <Flex justify="space-between" align="center">
                    <Text fontSize="12px" color="#64748B">
                      {fee.estimatedArrival}
                    </Text>
                    {isSelected && <Check size={18} color="#269FEF" strokeWidth={2.5} />}
                  </Flex>
                </Box>
              );
            })}
          </VStack>

          <Text fontSize="11px" color="#94A3B8" mt={2.5}>
            Waktu tiba berlaku untuk pembayaran sebelum pukul 15:30 (GMT+7).
          </Text>
        </Box>
      </DialogBody>

      <DialogFooter pt={2}>
        <PrimaryButton
          size="lg"
          isFullWidth
          onClick={() => {
            onConfirm(tempService, tempSpeed);
            onClose();
          }}
        >
          Terapkan Pilihan
        </PrimaryButton>
      </DialogFooter>
    </DialogContent>
  );
}

export function ServiceSpeedModal(props: ServiceSpeedModalProps) {
  return (
    <DialogRoot
      open={props.isOpen}
      onOpenChange={(details) => {
        if (!details.open) props.onClose();
      }}
    >
      {props.isOpen && (
        <ServiceSpeedModalContent
          key={`${props.selectedService}-${props.selectedSpeed}`}
          onClose={props.onClose}
          selectedService={props.selectedService}
          selectedSpeed={props.selectedSpeed}
          allFees={props.allFees}
          onConfirm={props.onConfirm}
          countryName={props.countryName}
        />
      )}
    </DialogRoot>
  );
}
