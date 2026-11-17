"use client";

import * as React from "react";
import { Box, Flex, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { CheckCircle2, Tag, X } from "lucide-react";
import { validatePromoCode, getPromoConfig } from "@/services/promo.service";
import { useT } from "@/store/lang-store";

export interface PromoCodeInputProps {
  sendAmountIdr: number;
  transferFeeIdr: number;
  appliedCode: string | null;
  discountIdr: number;
  onApply: (code: string, discountIdr: number) => void;
  onRemove: () => void;
}

export function PromoCodeInput({
  sendAmountIdr,
  transferFeeIdr,
  appliedCode,
  discountIdr,
  onApply,
  onRemove,
}: PromoCodeInputProps) {
  const T = useT();

  const [inputValue, setInputValue] = React.useState<string>(appliedCode || "");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const isApplied = Boolean(appliedCode);

  const formatIdr = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  const handleApply = () => {
    const code = inputValue.trim();
    if (!code) return;

    const result = validatePromoCode(code, sendAmountIdr, transferFeeIdr);

    if (!result.valid) {
      switch (result.errorKey) {
        case "INVALID_CODE":
          setErrorMsg(T("review.promo_invalid"));
          break;
        case "INACTIVE_CODE":
          setErrorMsg(T("review.promo_inactive"));
          break;
        case "MIN_AMOUNT_NOT_MET": {
          const minFormatted = new Intl.NumberFormat("id-ID").format(
            result.errorMeta?.min as number
          );
          setErrorMsg(T("review.promo_min_amount", { min: minFormatted }));
          break;
        }
        default:
          setErrorMsg(T("review.promo_invalid"));
      }
      return;
    }

    setErrorMsg(null);
    onApply(result.config!.code, result.discountIdr);
  };

  const handleRemove = () => {
    setInputValue("");
    setErrorMsg(null);
    onRemove();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApply();
    }
  };

  const promoConfig = appliedCode ? getPromoConfig(appliedCode) : null;

  return (
    <Box>
      <HStack gap={1.5} mb={2} align="center">
        <Tag size={15} color="#269FEF" />
        <Text fontSize="13px" fontWeight="700" color="#172B4D">
          {T("review.promo_code")}
        </Text>
      </HStack>

      {isApplied ? (
        // Applied state: show success banner with discount info
        <VStack gap={2} align="stretch">
          <HStack
            bg="#DCFCE7"
            border="1px solid #86EFAC"
            p={3}
            borderRadius="10px"
            justify="space-between"
            align="center"
          >
            <HStack gap={2}>
              <CheckCircle2 size={16} color="#16A34A" />
              <Box>
                <Text fontSize="13px" fontWeight="700" color="#166534">
                  {T("review.promo_applied")}
                </Text>
                <Text fontSize="12px" color="#15803D">
                  <strong>{appliedCode}</strong>
                  {promoConfig && ` — ${promoConfig.descriptionId}`}
                </Text>
              </Box>
            </HStack>
            <button
              type="button"
              onClick={handleRemove}
              title={T("review.promo_remove")}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                color: "#16A34A",
                padding: "4px",
              }}
            >
              <X size={16} />
            </button>
          </HStack>

          {/* Discount line */}
          <Flex justify="space-between" align="center" px={1}>
            <Text fontSize="13px" color="#16A34A" fontWeight="600">
              {T("review.discount")}
            </Text>
            <Text fontSize="13px" fontWeight="800" color="#16A34A">
              − {formatIdr(discountIdr)}
            </Text>
          </Flex>
        </VStack>
      ) : (
        // Input state
        <VStack gap={2} align="stretch">
          <HStack gap={2}>
            <Input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value.toUpperCase());
                setErrorMsg(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder={T("review.promo_placeholder")}
              fontSize="13px"
              fontFamily="monospace"
              letterSpacing="0.1em"
              borderRadius="10px"
              borderColor={errorMsg ? "#DC2626" : "#E2E8F0"}
              _focus={{
                borderColor: errorMsg ? "#DC2626" : "#269FEF",
                boxShadow: errorMsg ? "0 0 0 1px #DC2626" : "0 0 0 1px #269FEF",
              }}
            />
            <button
              type="button"
              onClick={handleApply}
              disabled={!inputValue.trim()}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 700,
                border: "1.5px solid #269FEF",
                background: inputValue.trim() ? "#269FEF" : "#F1F5F9",
                color: inputValue.trim() ? "#FFFFFF" : "#94A3B8",
                cursor: inputValue.trim() ? "pointer" : "not-allowed",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
              }}
            >
              {T("review.promo_apply")}
            </button>
          </HStack>

          {errorMsg && (
            <Text fontSize="12px" color="#DC2626">
              {errorMsg}
            </Text>
          )}
        </VStack>
      )}
    </Box>
  );
}
