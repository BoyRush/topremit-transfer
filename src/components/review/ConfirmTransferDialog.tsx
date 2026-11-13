"use client";

import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { PrimaryButton, SecondaryButton } from "@/components/common";

export interface ConfirmTransferDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
  recipientName: string;
  destinationCountry: string;
  sendAmountIdr: number;
  transferFeeIdr: number;
  totalPaymentIdr: number;
}

export function ConfirmTransferDialog({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
  recipientName,
  destinationCountry,
  sendAmountIdr,
  transferFeeIdr,
  totalPaymentIdr,
}: ConfirmTransferDialogProps) {
  const formatIdr = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(details) => {
        // Cancel must NOT create a transaction
        if (!details.open && !isSubmitting) {
          onClose();
        }
      }}
    >
      <DialogContent style={{ maxWidth: "480px" }}>
        <DialogCloseTrigger disabled={isSubmitting} />

        <DialogHeader pb={2}>
          <HStack gap={2.5}>
            <Box
              p={2}
              borderRadius="10px"
              bg="#EAF6FF"
              color="#269FEF"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ShieldCheck size={22} />
            </Box>
            <DialogTitle fontSize="18px" fontWeight="800" color="#172B4D">
              Confirm your transfer
            </DialogTitle>
          </HStack>
        </DialogHeader>

        <DialogBody py={4}>
          <Text fontSize="13px" color="#64748B" mb={4}>
            Pastikan seluruh data transfer sudah sesuai. Transaksi yang dikonfirmasi akan segera
            diproses oleh sistem perbankan.
          </Text>

          {/* Key Summary Details Card */}
          <Box bg="#F5F8FC" border="1px solid #E7EDF5" borderRadius="12px" p={4} mb={4}>
            <VStack gap={2.5} align="stretch" fontSize="13px">
              <Flex justify="space-between" align="center">
                <Text color="#64748B">Nama Penerima:</Text>
                <Text fontWeight="700" color="#172B4D">
                  {recipientName}
                </Text>
              </Flex>

              <Flex justify="space-between" align="center">
                <Text color="#64748B">Negara Tujuan:</Text>
                <Text fontWeight="700" color="#172B4D">
                  {destinationCountry}
                </Text>
              </Flex>

              <Flex justify="space-between" align="center">
                <Text color="#64748B">Nominal Transfer:</Text>
                <Text fontWeight="700" color="#172B4D">
                  {formatIdr(sendAmountIdr)}
                </Text>
              </Flex>

              <Flex justify="space-between" align="center">
                <Text color="#64748B">Biaya Pengiriman:</Text>
                <Text fontWeight="600" color="#172B4D">
                  {formatIdr(transferFeeIdr)}
                </Text>
              </Flex>

              <Box borderTop="1px dashed #CBD5E1" pt={2.5} mt={0.5}>
                <Flex justify="space-between" align="center">
                  <Text fontWeight="700" color="#172B4D">
                    Total Pembayaran:
                  </Text>
                  <Text fontWeight="800" color="#269FEF" fontSize="16px">
                    {formatIdr(totalPaymentIdr)}
                  </Text>
                </Flex>
              </Box>
            </VStack>
          </Box>

          <HStack
            bg="#FEF3C7"
            p={3}
            borderRadius="10px"
            border="1px solid #FDE68A"
            gap={2.5}
            align="start"
          >
            <AlertCircle size={18} color="#B45309" style={{ flexShrink: 0, marginTop: "2px" }} />
            <Text fontSize="12px" color="#92400E" lineHeight="shorter">
              Ini adalah simulasi prototipe. Dana riil tidak akan dipotong dari saldo perbankan
              Anda.
            </Text>
          </HStack>
        </DialogBody>

        <DialogFooter gap={3} pt={2}>
          {/* Cancel Button - explicitly closes without creating transaction */}
          <SecondaryButton size="md" onClick={onClose} disabled={isSubmitting} style={{ flex: 1 }}>
            Cancel
          </SecondaryButton>

          {/* Confirm Transfer Button - the ONLY trigger for transaction creation */}
          <PrimaryButton
            size="md"
            onClick={onConfirm}
            isLoading={isSubmitting}
            disabled={isSubmitting}
            rightIcon={<ArrowRight size={16} />}
            style={{ flex: 1.2 }}
          >
            Confirm Transfer
          </PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
