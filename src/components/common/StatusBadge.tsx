import { Box, HStack, Text } from "@chakra-ui/react";

export type TransactionStatusType = "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";

export interface StatusBadgeProps {
  status: TransactionStatusType;
}

const statusConfig: Record<
  TransactionStatusType,
  { label: string; bg: string; color: string; dot: string }
> = {
  PENDING: {
    label: "Menunggu Pembayaran",
    bg: "#FEF3C7",
    color: "#B45309",
    dot: "#F59E0B",
  },
  PROCESSING: {
    label: "Sedang Diproses",
    bg: "#EAF6FF",
    color: "#1688DB",
    dot: "#269FEF",
  },
  COMPLETED: {
    label: "Berhasil Terkirim",
    bg: "#DCFCE7",
    color: "#15803D",
    dot: "#16A34A",
  },
  CANCELLED: {
    label: "Dibatalkan",
    bg: "#FEE2E2",
    color: "#B91C1C",
    dot: "#DC2626",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.PROCESSING;

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      bg={config.bg}
      color={config.color}
      px={2.5}
      py={1}
      borderRadius="full"
      fontSize="12px"
      fontWeight="700"
    >
      <HStack gap={1.5}>
        <Box w="6px" h="6px" borderRadius="full" bg={config.dot} />
        <Text>{config.label}</Text>
      </HStack>
    </Box>
  );
}
