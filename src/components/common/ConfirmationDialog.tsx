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
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";

export interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
  recipientName?: string;
  recipientBank?: string;
  accountNumber?: string;
  destinationCountry?: string;
  destinationCurrency?: string;
  receiveAmountFx?: number;
  totalPaymentIdr?: number;
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
  recipientName = "Penerima",
  recipientBank = "Bank Penerima",
  accountNumber = "-",
  destinationCountry = "Tujuan",
  destinationCurrency = "USD",
  receiveAmountFx = 0,
  totalPaymentIdr = 0,
}: ConfirmationDialogProps) {
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

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open && !isSubmitting) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogCloseTrigger />

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
              Konfirmasi Pengiriman Uang
            </DialogTitle>
          </HStack>
        </DialogHeader>

        <DialogBody py={4}>
          <Text fontSize="13px" color="#64748B" mb={4}>
            Mohon periksa kembali detail transaksi Anda sebelum mengirim. Dana yang telah diproses
            tidak dapat dibatalkan.
          </Text>

          {/* Transfer Detail Card */}
          <Box bg="#F5F8FC" border="1px solid #E7EDF5" borderRadius="12px" p={4} mb={4}>
            <VStack gap={2.5} align="stretch" fontSize="13px">
              <Flex justify="space-between" align="center">
                <Text color="#64748B">Nama Penerima</Text>
                <Text fontWeight="700" color="#172B4D">
                  {recipientName}
                </Text>
              </Flex>

              <Flex justify="space-between" align="center">
                <Text color="#64748B">Bank & No. Rekening</Text>
                <Text fontWeight="600" color="#172B4D">
                  {recipientBank} - {accountNumber}
                </Text>
              </Flex>

              <Flex justify="space-between" align="center">
                <Text color="#64748B">Negara Tujuan</Text>
                <Text fontWeight="600" color="#172B4D">
                  {destinationCountry}
                </Text>
              </Flex>

              <Flex justify="space-between" align="center">
                <Text color="#64748B">Penerima Menerima</Text>
                <Text fontWeight="800" color="#16A34A" fontSize="14px">
                  {formatFx(receiveAmountFx, destinationCurrency)}
                </Text>
              </Flex>

              <Box borderTop="1px dashed #E7EDF5" pt={2.5} mt={0.5}>
                <Flex justify="space-between" align="center">
                  <Text fontWeight="700" color="#172B4D">
                    Total Yang Harus Dibayar
                  </Text>
                  <Text fontWeight="800" color="#269FEF" fontSize="16px">
                    {formatIdr(totalPaymentIdr)}
                  </Text>
                </Flex>
              </Box>
            </VStack>
          </Box>

          {/* Simulation Notice */}
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
              Ini adalah simulasi prototipe. Tidak ada uang riil yang ditarik dari rekening Anda.
            </Text>
          </HStack>
        </DialogBody>

        <DialogFooter gap={3} pt={2}>
          <SecondaryButton size="md" onClick={onClose} disabled={isSubmitting} style={{ flex: 1 }}>
            Periksa Kembali
          </SecondaryButton>

          <PrimaryButton
            size="md"
            onClick={onConfirm}
            isLoading={isSubmitting}
            rightIcon={<ArrowRight size={16} />}
            style={{ flex: 1 }}
          >
            Konfirmasi & Kirim
          </PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
