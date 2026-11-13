"use client";

import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Building2, ChevronRight, Clock, Wallet } from "lucide-react";
import * as React from "react";

export type ServiceType = "BANK_TRANSFER" | "E_WALLET";
export type SpeedType = "REGULAR" | "INSTANT";

export interface ServiceCardProps {
  serviceType: ServiceType;
  speed: SpeedType;
  feeAmountIdr: number;
  estimatedArrival?: string;
  onEdit?: () => void;
  isClickable?: boolean;
}

export function ServiceCard({
  serviceType,
  speed,
  feeAmountIdr,
  estimatedArrival = "3 hari kerja bank",
  onEdit,
  isClickable = true,
}: ServiceCardProps) {
  const isBank = serviceType === "BANK_TRANSFER";
  const formattedFee = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(feeAmountIdr);

  return (
    <Box
      bg="#FFFFFF"
      border="1px solid #E7EDF5"
      borderRadius="16px"
      p={5}
      boxShadow="0px 2px 6px rgba(15, 23, 42, 0.03)"
      cursor={isClickable && onEdit ? "pointer" : "default"}
      onClick={isClickable ? onEdit : undefined}
      transition="all 0.15s ease"
      _hover={
        isClickable && onEdit
          ? {
              borderColor: "#269FEF",
              boxShadow: "0px 4px 12px rgba(38, 159, 239, 0.1)",
            }
          : undefined
      }
    >
      {/* Header Row */}
      <Flex justify="space-between" align="center" mb={3}>
        <Text fontSize="13px" fontWeight="600" color="#64748B">
          Layanan & Mode Pengiriman
        </Text>

        {isClickable && onEdit && (
          <HStack gap={1} color="#269FEF" fontSize="13px" fontWeight="600">
            <Text>Ubah</Text>
            <ChevronRight size={14} />
          </HStack>
        )}
      </Flex>

      {/* Main Service Box */}
      <Box bg="#F5F8FC" border="1px solid #E7EDF5" borderRadius="12px" p={4}>
        <Flex justify="space-between" align="center" mb={2}>
          <HStack gap={2.5}>
            <Box p={2} borderRadius="8px" bg="#EAF6FF" color="#269FEF">
              {isBank ? <Building2 size={18} /> : <Wallet size={18} />}
            </Box>
            <Text fontSize="15px" fontWeight="700" color="#172B4D">
              {isBank ? "Bank Transfer" : "E-Wallet"}
            </Text>
          </HStack>

          <Text fontSize="15px" fontWeight="800" color="#172B4D">
            {formattedFee}
          </Text>
        </Flex>

        {/* Speed & Arrival Notice */}
        <Flex justify="space-between" align="center" pt={2} borderTop="1px dashed #E7EDF5">
          <HStack gap={1.5} color="#64748B" fontSize="13px">
            <Clock size={14} />
            <Text>{speed === "INSTANT" ? "Instan" : "Normal"}</Text>
            <Text color="#94A3B8">•</Text>
            <Text>{estimatedArrival}</Text>
          </HStack>
        </Flex>
      </Box>

      {/* Footer Info Notice */}
      <Text fontSize="11px" color="#94A3B8" mt={3}>
        Waktu tiba berlaku untuk pembayaran sebelum pukul 15:30 WIB di hari kerja.
      </Text>
    </Box>
  );
}
