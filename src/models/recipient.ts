import * as yup from "yup";

export const TRANSFER_PURPOSE_OPTIONS = [
  { value: "FAMILY_SUPPORT", label: "Family Support (Dukungan Keluarga)" },
  { value: "EDUCATION", label: "Education (Biaya Pendidikan / Kuliah)" },
  { value: "BUSINESS_PAYMENT", label: "Business Payment (Pembayaran Bisnis / Vendor)" },
  { value: "PERSONAL_EXPENSES", label: "Personal Expenses (Keperluan Pribadi)" },
  { value: "OTHER", label: "Other (Lainnya)" },
] as const;

export type TransferPurposeValue = (typeof TRANSFER_PURPOSE_OPTIONS)[number]["value"];

/**
 * Dedicated Yup validation schema for Recipient Information
 */
export const recipientValidationSchema = yup.object().shape({
  bankCode: yup.string().required("Bank tujuan wajib dipilih"),
  bankName: yup.string().required("Bank tujuan wajib dipilih"),
  accountNumber: yup
    .string()
    .required("Nomor rekening wajib diisi")
    .matches(/^\d+$/, "Nomor rekening hanya boleh berisi angka")
    .min(5, "Nomor rekening minimal 5 digit")
    .max(34, "Nomor rekening maksimal 34 digit"),
  fullName: yup
    .string()
    .transform((val) => (typeof val === "string" ? val.trim() : val))
    .required("Nama lengkap penerima wajib diisi")
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(100, "Nama lengkap maksimal 100 karakter"),
  transferPurpose: yup
    .string()
    .required("Tujuan transfer wajib dipilih")
    .oneOf(
      TRANSFER_PURPOSE_OPTIONS.map((o) => o.value),
      "Tujuan transfer tidak valid"
    ),
  email: yup
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .nullable()
    .optional()
    .email("Format alamat email tidak valid"),
  note: yup.string().max(255, "Catatan maksimal 255 karakter").optional().default(""),
});

export type RecipientFormData = yup.InferType<typeof recipientValidationSchema>;
