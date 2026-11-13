"use client";

import { useCallback, useState } from "react";
import {
  convertFxToIdr,
  convertIdrToFx,
  formatCurrencyDisplay,
  parseFormattedNumber,
  sanitizeCurrencyInput,
} from "@/services/currency-math";

export interface UseTransferCalculatorProps {
  initialSendIdr?: number;
  exchangeRate: number;
  currencyCode: string;
}

export const TRANSFER_LIMITS = {
  MIN_SEND_IDR: 100000, // 100 thousand IDR
  MAX_SEND_IDR: 100000000, // 100 million IDR
};

export function useTransferCalculator({
  initialSendIdr = 1000000,
  exchangeRate,
  currencyCode,
}: UseTransferCalculatorProps) {
  // Numeric state
  const [sendAmountIdr, setSendAmountIdr] = useState<number>(initialSendIdr);
  const [receiveAmountFx, setReceiveAmountFx] = useState<number>(() =>
    convertIdrToFx(initialSendIdr, exchangeRate, currencyCode)
  );

  // Raw string inputs displayed to user
  const [sendInputStr, setSendInputStr] = useState<string>(() =>
    formatCurrencyDisplay(initialSendIdr, "IDR", false)
  );
  const [receiveInputStr, setReceiveInputStr] = useState<string>(() =>
    formatCurrencyDisplay(
      convertIdrToFx(initialSendIdr, exchangeRate, currencyCode),
      currencyCode,
      false
    )
  );

  // Track user active edit source to prevent infinite loops
  const [lastEdited, setLastEdited] = useState<"IDR" | "FX">("IDR");

  // Track previous rate and currency to adjust state when props change (React 19 pattern)
  const [prevRate, setPrevRate] = useState(exchangeRate);
  const [prevCurrency, setPrevCurrency] = useState(currencyCode);

  if (exchangeRate !== prevRate || currencyCode !== prevCurrency) {
    setPrevRate(exchangeRate);
    setPrevCurrency(currencyCode);

    if (exchangeRate > 0) {
      if (lastEdited === "IDR") {
        const computedFx = convertIdrToFx(sendAmountIdr, exchangeRate, currencyCode);
        setReceiveAmountFx(computedFx);
        setReceiveInputStr(formatCurrencyDisplay(computedFx, currencyCode, false));
      } else {
        const computedIdr = convertFxToIdr(receiveAmountFx, exchangeRate);
        setSendAmountIdr(computedIdr);
        setSendInputStr(formatCurrencyDisplay(computedIdr, "IDR", false));
      }
    }
  }

  // Handler for typing in Send Amount (IDR)
  const handleSendAmountChange = useCallback(
    (rawVal: string) => {
      setLastEdited("IDR");

      // IDR has 0 decimals
      const sanitized = sanitizeCurrencyInput(rawVal, 0);
      if (sanitized === "") {
        setSendInputStr("");
        setSendAmountIdr(0);
        setReceiveAmountFx(0);
        setReceiveInputStr("0");
        return;
      }

      const numIdr = parseFormattedNumber(sanitized);
      const formattedIdr = formatCurrencyDisplay(numIdr, "IDR", true);
      setSendInputStr(formattedIdr);
      setSendAmountIdr(numIdr);

      // Compute destination currency immediately
      if (exchangeRate > 0) {
        const computedFx = convertIdrToFx(numIdr, exchangeRate, currencyCode);
        setReceiveAmountFx(computedFx);
        setReceiveInputStr(formatCurrencyDisplay(computedFx, currencyCode, false));
      }
    },
    [exchangeRate, currencyCode]
  );

  // Handler for typing in Receive Amount (FX)
  const handleReceiveAmountChange = useCallback(
    (rawVal: string) => {
      setLastEdited("FX");

      const sanitized = sanitizeCurrencyInput(rawVal, 2);
      if (sanitized === "") {
        setReceiveInputStr("");
        setReceiveAmountFx(0);
        setSendAmountIdr(0);
        setSendInputStr("0");
        return;
      }

      // Preserve trailing decimal while typing (e.g. "50.")
      const isPartialDecimal = sanitized.endsWith(".");
      const numFx = parseFormattedNumber(sanitized);

      setReceiveInputStr(isPartialDecimal ? sanitized : rawVal);
      setReceiveAmountFx(numFx);

      // Compute IDR amount immediately
      if (exchangeRate > 0) {
        const computedIdr = convertFxToIdr(numFx, exchangeRate);
        setSendAmountIdr(computedIdr);
        setSendInputStr(formatCurrencyDisplay(computedIdr, "IDR", false));
      }
    },
    [exchangeRate]
  );

  // Validation
  const isSendAmountBelowMin = sendAmountIdr > 0 && sendAmountIdr < TRANSFER_LIMITS.MIN_SEND_IDR;
  const isSendAmountAboveMax = sendAmountIdr > TRANSFER_LIMITS.MAX_SEND_IDR;
  const isSendAmountZeroOrNegative = sendAmountIdr <= 0;

  let validationError: string | null = null;
  if (isSendAmountBelowMin) {
    validationError = `Minimal pengiriman adalah IDR ${TRANSFER_LIMITS.MIN_SEND_IDR.toLocaleString("id-ID")}`;
  } else if (isSendAmountAboveMax) {
    validationError = `Maksimal pengiriman adalah IDR ${TRANSFER_LIMITS.MAX_SEND_IDR.toLocaleString("id-ID")}`;
  } else if (isSendAmountZeroOrNegative && sendInputStr !== "") {
    validationError = "Nominal transfer harus lebih besar dari 0";
  } else if (exchangeRate <= 0) {
    validationError = "Kurs untuk mata uang tujuan belum tersedia";
  }

  const isValid = !validationError && sendAmountIdr > 0 && receiveAmountFx > 0 && exchangeRate > 0;

  return {
    sendAmountIdr,
    receiveAmountFx,
    sendInputStr,
    receiveInputStr,
    handleSendAmountChange,
    handleReceiveAmountChange,
    isValid,
    validationError,
    limits: TRANSFER_LIMITS,
  };
}
