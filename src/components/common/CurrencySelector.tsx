"use client";

import { Box, HStack, Text } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import * as React from "react";

export interface CurrencySelectorProps {
  flag: string;
  currencyCode: string;
  countryName?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function CurrencySelector({
  flag,
  currencyCode,
  countryName,
  onClick,
  disabled = false,
}: CurrencySelectorProps) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={`Pilih mata uang: ${currencyCode}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: "#F5F8FC",
        border: "1px solid #E7EDF5",
        borderRadius: "10px",
        padding: "8px 12px",
        cursor: disabled ? "default" : "pointer",
        transition: "all 0.15s ease",
        outline: "none",
      }}
    >
      <HStack gap={2}>
        <Text fontSize="18px" lineHeight="1">
          {flag}
        </Text>
        <Box textAlign="left">
          <Text fontSize="14px" fontWeight="700" color="#172B4D" lineHeight="1">
            {currencyCode}
          </Text>
          {countryName && (
            <Text
              fontSize="10px"
              color="#64748B"
              maxW="80px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {countryName}
            </Text>
          )}
        </Box>
        {!disabled && <ChevronDown size={16} color="#64748B" />}
      </HStack>
    </button>
  );
}
