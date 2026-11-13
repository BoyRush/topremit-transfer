import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Tag } from "lucide-react";

export interface TransferSummaryProps {
  sendAmountIdr: number;
  receiveAmountFx: number;
  currencyCode: string;
  exchangeRate: number;
  transferFeeIdr: number;
  discountIdr?: number;
  promoCode?: string | null;
  paymentBankName?: string | null;
}

export function TransferSummary({
  sendAmountIdr,
  receiveAmountFx,
  currencyCode,
  exchangeRate,
  transferFeeIdr,
  discountIdr = 0,
  promoCode,
  paymentBankName,
}: TransferSummaryProps) {
  const totalPayment = Math.max(0, sendAmountIdr + transferFeeIdr - discountIdr);

  const formatIdr = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  const formatFx = (val: number, code: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      maximumFractionDigits: 2,
    }).format(val);

  // Calculate inverse rate: 1 FX = X IDR
  const fxToIdrRate = exchangeRate > 0 ? 1 / exchangeRate : 0;
  const formattedRate = `1 ${currencyCode} = ${formatIdr(fxToIdrRate)}`;

  return (
    <Box
      bg="#FFFFFF"
      border="1px solid #E7EDF5"
      borderRadius="16px"
      p={5}
      boxShadow="0px 2px 6px rgba(15, 23, 42, 0.03)"
    >
      <Text fontSize="14px" fontWeight="700" color="#172B4D" mb={4}>
        Rincian Pembayaran
      </Text>

      <VStack gap={3} align="stretch" fontSize="13px">
        {/* Send Amount */}
        <Flex justify="space-between" align="center">
          <Text color="#64748B">Nominal Transfer</Text>
          <Text fontWeight="600" color="#172B4D">
            {formatIdr(sendAmountIdr)}
          </Text>
        </Flex>

        {/* Receive Amount */}
        <Flex justify="space-between" align="center">
          <Text color="#64748B">Penerima Mendapatkan</Text>
          <Text fontWeight="700" color="#16A34A">
            {formatFx(receiveAmountFx, currencyCode)}
          </Text>
        </Flex>

        {/* Exchange Rate */}
        <Flex justify="space-between" align="center">
          <Text color="#64748B">Nilai Tukar (Kurs)</Text>
          <Text fontWeight="600" color="#172B4D">
            {formattedRate}
          </Text>
        </Flex>

        {/* Transfer Fee */}
        <Flex justify="space-between" align="center">
          <Text color="#64748B">Biaya Pengiriman</Text>
          <Text fontWeight="600" color="#172B4D">
            {formatIdr(transferFeeIdr)}
          </Text>
        </Flex>

        {/* Discount (if any) */}
        {discountIdr > 0 && (
          <Flex justify="space-between" align="center" color="#16A34A">
            <HStack gap={1.5}>
              <Tag size={14} />
              <Text fontWeight="600">Diskon Promo ({promoCode})</Text>
            </HStack>
            <Text fontWeight="700">-{formatIdr(discountIdr)}</Text>
          </Flex>
        )}

        {/* Payment Bank (if chosen) */}
        {paymentBankName && (
          <Flex justify="space-between" align="center">
            <Text color="#64748B">Metode Pembayaran</Text>
            <Text fontWeight="600" color="#172B4D">
              {paymentBankName}
            </Text>
          </Flex>
        )}

        {/* Total Payment Divider */}
        <Box borderTop="1.5px dashed #E7EDF5" pt={3} mt={1}>
          <Flex justify="space-between" align="baseline">
            <Box>
              <Text fontSize="14px" fontWeight="700" color="#172B4D">
                Total Pembayaran
              </Text>
              <Text fontSize="11px" color="#94A3B8">
                Sudah termasuk biaya dan diskon
              </Text>
            </Box>

            <Text fontSize="20px" fontWeight="800" color="#269FEF">
              {formatIdr(totalPayment)}
            </Text>
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
}
