"use client";

import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Info, Sparkles } from "lucide-react";

export interface RateDisplayBannerProps {
  currencyCode: string;
  inverseRate: number;
  lastUpdated?: string;
}

export function RateDisplayBanner({
  currencyCode,
  inverseRate,
  lastUpdated,
}: RateDisplayBannerProps) {
  const formattedRate = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(inverseRate);

  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Hari ini";

  return (
    <Box
      bg="#FFFFFF"
      border="1px solid #E7EDF5"
      borderRadius="12px"
      px={4}
      py={2.5}
      boxShadow="0px 2px 4px rgba(15, 23, 42, 0.02)"
    >
      <Flex justify="space-between" align="center" flexWrap="wrap" gap={2}>
        <HStack gap={2}>
          <Box
            p={1}
            borderRadius="6px"
            bg="#EAF6FF"
            color="#269FEF"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Sparkles size={14} />
          </Box>
          <Text fontSize="13px" fontWeight="600" color="#64748B">
            Kurs:{" "}
            <Text as="span" fontWeight="800" color="#1688DB">
              1 {currencyCode} = {formattedRate}
            </Text>
          </Text>
        </HStack>

        <HStack gap={1} color="#94A3B8" fontSize="11px">
          <Info size={12} />
          <Text>Diperbarui: {formattedDate}</Text>
        </HStack>
      </Flex>
    </Box>
  );
}
