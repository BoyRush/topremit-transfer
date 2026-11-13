"use client";

import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import * as React from "react";
import { Building2, Check, Search, X } from "lucide-react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import type { DestinationBank } from "@/models/bank";

export interface BankSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  banks: DestinationBank[];
  selectedBankCode: string;
  onSelectBank: (code: string, name: string) => void;
  countryName?: string;
}

export function BankSelectModal({
  isOpen,
  onClose,
  banks,
  selectedBankCode,
  onSelectBank,
  countryName = "negara tujuan",
}: BankSelectModalProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredBanks = React.useMemo(() => {
    if (!searchQuery.trim()) return banks;
    const q = searchQuery.toLowerCase().trim();
    return banks.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.code.toLowerCase().includes(q) ||
        (b.swiftBic && b.swiftBic.toLowerCase().includes(q))
    );
  }, [banks, searchQuery]);

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open) {
          onClose();
          setSearchQuery("");
        }
      }}
    >
      <DialogContent style={{ maxWidth: "480px" }}>
        <DialogCloseTrigger />

        <DialogHeader pb={2}>
          <DialogTitle fontSize="18px" fontWeight="800" color="#172B4D">
            Pilih Bank Penerima
          </DialogTitle>
          <Text fontSize="12px" color="#64748B" mt={0.5}>
            Daftar bank yang didukung di {countryName}
          </Text>
        </DialogHeader>

        <DialogBody pt={2} pb={6}>
          {/* Search Bar */}
          <Box
            position="relative"
            bg="#F5F8FC"
            borderRadius="12px"
            border="1.5px solid #E7EDF5"
            px={3.5}
            py={2.5}
            mb={4}
            display="flex"
            alignItems="center"
            gap={2.5}
            _focusWithin={{ borderColor: "#269FEF", bg: "#FFFFFF" }}
          >
            <Search size={18} color="#64748B" style={{ flexShrink: 0 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama bank atau kode SWIFT/BIC"
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "14px",
                color: "#172B4D",
                fontFamily: "var(--font-inter), sans-serif",
              }}
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#94A3B8",
                  padding: "2px",
                }}
              >
                <X size={16} />
              </button>
            )}
          </Box>

          {/* Banks List */}
          <Box maxH="320px" overflowY="auto" pr={1}>
            {filteredBanks.length === 0 ? (
              <Box py={8} textAlign="center">
                <Text fontSize="14px" color="#64748B">
                  Bank tidak ditemukan. Silakan gunakan kata kunci lain.
                </Text>
              </Box>
            ) : (
              <VStack gap={1.5} align="stretch">
                {filteredBanks.map((bank) => {
                  const isSelected = bank.code === selectedBankCode;

                  return (
                    <Flex
                      key={bank.id}
                      justify="space-between"
                      align="center"
                      p={3}
                      borderRadius="12px"
                      cursor="pointer"
                      transition="all 0.15s ease"
                      bg={isSelected ? "#EAF6FF" : "transparent"}
                      border="1px solid"
                      borderColor={isSelected ? "#269FEF" : "transparent"}
                      _hover={{
                        bg: isSelected ? "#EAF6FF" : "#F5F8FC",
                        borderColor: isSelected ? "#269FEF" : "#E7EDF5",
                      }}
                      onClick={() => {
                        onSelectBank(bank.code, bank.name);
                        onClose();
                        setSearchQuery("");
                      }}
                    >
                      <HStack gap={3}>
                        <Box
                          p={2}
                          borderRadius="8px"
                          bg={isSelected ? "#269FEF" : "#F5F8FC"}
                          color={isSelected ? "#FFFFFF" : "#64748B"}
                        >
                          <Building2 size={16} />
                        </Box>
                        <Box textAlign="left">
                          <Text fontSize="14px" fontWeight="700" color="#172B4D">
                            {bank.name}
                          </Text>
                          {bank.swiftBic && (
                            <Text fontSize="11px" color="#64748B">
                              SWIFT: {bank.swiftBic}
                            </Text>
                          )}
                        </Box>
                      </HStack>

                      {isSelected && <Check size={18} color="#269FEF" strokeWidth={2.5} />}
                    </Flex>
                  );
                })}
              </VStack>
            )}
          </Box>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
