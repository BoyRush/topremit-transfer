"use client";

import { Box, Flex, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { Check } from "lucide-react";
import type { PaymentBank } from "@/models/payment-bank";

export interface PaymentBankPickerProps {
  paymentBanks: PaymentBank[];
  selectedBankId: string | null;
  onSelectBank: (bankId: string) => void;
  error?: string;
}

export function PaymentBankPicker({
  paymentBanks,
  selectedBankId,
  onSelectBank,
  error,
}: PaymentBankPickerProps) {
  return (
    <Box
      bg="#FFFFFF"
      p={{ base: 5, sm: 6 }}
      borderRadius="16px"
      border="1.5px solid"
      borderColor={error ? "#DC2626" : "#E7EDF5"}
      boxShadow="0px 2px 6px rgba(15, 23, 42, 0.03)"
    >
      <Flex justify="space-between" align="baseline" mb={3}>
        <Box>
          <Text fontSize="15px" fontWeight="700" color="#172B4D">
            Pilih Bank Pembayaran (Rekening Asal)
          </Text>
          <Text fontSize="12px" color="#64748B">
            Pilih bank lokal di Indonesia yang akan Anda gunakan untuk mentransfer dana
          </Text>
        </Box>
        {error && (
          <Text fontSize="12px" color="#DC2626" fontWeight="600">
            {error}
          </Text>
        )}
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2 }} gap={3} pt={2}>
        {paymentBanks.map((bank) => {
          const isSelected = selectedBankId?.toLowerCase() === bank.id.toLowerCase();

          return (
            <Box
              key={bank.id}
              p={3.5}
              borderRadius="12px"
              border="2px solid"
              borderColor={isSelected ? "#269FEF" : "#E7EDF5"}
              bg={isSelected ? "#F0F8FF" : "#FFFFFF"}
              cursor="pointer"
              transition="all 0.15s ease"
              onClick={() => onSelectBank(bank.id)}
              _hover={{
                borderColor: "#269FEF",
                boxShadow: "0px 2px 8px rgba(38, 159, 239, 0.1)",
              }}
            >
              <Flex justify="space-between" align="center">
                <HStack gap={2.5}>
                  <Box
                    w="36px"
                    h="36px"
                    borderRadius="8px"
                    bg={isSelected ? "#269FEF" : "#F5F8FC"}
                    color={isSelected ? "#FFFFFF" : "#1688DB"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="800"
                    fontSize="11px"
                    border="1px solid"
                    borderColor={isSelected ? "#269FEF" : "#E7EDF5"}
                  >
                    {bank.code}
                  </Box>
                  <Box>
                    <Text fontSize="14px" fontWeight="700" color="#172B4D">
                      {bank.code}
                    </Text>
                    <Text
                      fontSize="11px"
                      color="#64748B"
                      maxW="160px"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {bank.name}
                    </Text>
                  </Box>
                </HStack>

                {isSelected ? (
                  <Box
                    w="20px"
                    h="20px"
                    borderRadius="full"
                    bg="#269FEF"
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Check size={14} strokeWidth={3} />
                  </Box>
                ) : (
                  <Box w="20px" h="20px" borderRadius="full" border="2px solid #CBD5E1" />
                )}
              </Flex>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
