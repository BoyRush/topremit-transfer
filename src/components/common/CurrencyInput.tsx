"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import * as React from "react";
import { CurrencySelector } from "./CurrencySelector";

export interface CurrencyInputProps {
  label: string;
  value: string | number;
  onChangeValue?: (val: string) => void;
  currencyCode: string;
  flag: string;
  countryName?: string;
  onSelectCurrency?: () => void;
  isCurrencySelectable?: boolean;
  isReadOnly?: boolean;
  minAmount?: string;
  maxAmount?: string;
  error?: string;
  id?: string;
}

export function CurrencyInput({
  label,
  value,
  onChangeValue,
  currencyCode,
  flag,
  countryName,
  onSelectCurrency,
  isCurrencySelectable = false,
  isReadOnly = false,
  minAmount,
  maxAmount,
  error,
  id,
}: CurrencyInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <Box
      bg="#FFFFFF"
      border="1.5px solid"
      borderColor={error ? "#DC2626" : isFocused ? "#269FEF" : "#E7EDF5"}
      borderRadius="16px"
      p={4}
      boxShadow={
        isFocused
          ? "0px 0px 0px 4px rgba(38, 159, 239, 0.15)"
          : "0px 2px 6px rgba(15, 23, 42, 0.03)"
      }
      transition="all 0.2s ease"
    >
      {/* Top Header Row */}
      <Flex justify="space-between" align="center" mb={3}>
        <CurrencySelector
          flag={flag}
          currencyCode={currencyCode}
          countryName={countryName}
          onClick={onSelectCurrency}
          disabled={!isCurrencySelectable}
        />

        <Text fontSize="13px" fontWeight="600" color="#64748B">
          {label}
        </Text>
      </Flex>

      {/* Amount Input Row */}
      <Flex align="baseline" justify="flex-end">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          readOnly={isReadOnly}
          onChange={(e) => onChangeValue?.(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="0"
          style={{
            width: "100%",
            textAlign: "right",
            fontSize: "28px",
            fontWeight: "800",
            color: "#172B4D",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            letterSpacing: "-0.5px",
            fontFamily: "var(--font-inter), sans-serif",
          }}
          aria-label={label}
        />
      </Flex>

      {/* Optional limits or error */}
      {(minAmount || maxAmount || error) && (
        <Flex justify="space-between" align="center" mt={2} pt={2} borderTop="1px solid #F5F8FC">
          {error ? (
            <Text fontSize="12px" color="#DC2626" fontWeight="500">
              {error}
            </Text>
          ) : (
            <Text fontSize="11px" color="#94A3B8">
              {minAmount && `Min: ${minAmount}`} {maxAmount && `• Maks: ${maxAmount}`}
            </Text>
          )}
        </Flex>
      )}
    </Box>
  );
}
