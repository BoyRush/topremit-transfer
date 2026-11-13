"use client";

import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recipientValidationSchema, type RecipientFormData } from "@/models/recipient";
import { useTransferStore } from "@/store/transfer-store";

export interface UseTransferFormProps {
  onSuccess?: (data: RecipientFormData) => void;
}

export function useTransferForm({ onSuccess }: UseTransferFormProps = {}) {
  const store = useTransferStore();
  const existing = store.recipient;

  const form = useForm<RecipientFormData>({
    resolver: yupResolver(recipientValidationSchema),
    defaultValues: {
      bankCode: existing?.bankCode || "",
      bankName: existing?.bankName || "",
      accountNumber: existing?.accountNumber || "",
      fullName: existing?.fullName || "",
      transferPurpose:
        (existing?.transferPurpose as RecipientFormData["transferPurpose"]) || "FAMILY_SUPPORT",
      email: existing?.email || "",
      note: existing?.note || "",
    },
    mode: "onBlur",
  });

  const { handleSubmit, setValue, control } = form;

  // Live Note character count using optimized useWatch
  const noteValue = useWatch({ control, name: "note" }) || "";
  const noteCharCount = noteValue.length;
  const noteRemainingChars = Math.max(0, 255 - noteCharCount);

  // Searchable Bank selection helper
  const handleSelectBank = (code: string, name: string) => {
    setValue("bankCode", code, { shouldValidate: true });
    setValue("bankName", name, { shouldValidate: true });
  };

  const selectedBankCode = useWatch({ control, name: "bankCode" }) || "";
  const selectedBankName = useWatch({ control, name: "bankName" }) || "";

  // Submission handler
  const onSubmit = handleSubmit((data) => {
    store.setRecipient({
      bankCode: data.bankCode,
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      fullName: data.fullName,
      transferPurpose: data.transferPurpose,
      email: data.email || undefined,
      note: data.note || undefined,
    });
    store.setStep(3);
    onSuccess?.(data);
  });

  return {
    ...form,
    onSubmit,
    noteCharCount,
    noteRemainingChars,
    handleSelectBank,
    selectedBankCode,
    selectedBankName,
  };
}
