"use client";

import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import * as React from "react";
import { Check, Rocket, Search, X } from "lucide-react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Country } from "@/models/country";

export interface CountrySelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (country: Country) => void;
  countries: Country[];
  selectedCountryCode: string;
}

export function CountrySelectModal({
  isOpen,
  onClose,
  onSelectCountry,
  countries,
  selectedCountryCode,
}: CountrySelectModalProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredCountries = React.useMemo(() => {
    if (!searchQuery.trim()) return countries;
    const query = searchQuery.toLowerCase().trim();
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        (c.localName && c.localName.toLowerCase().includes(query)) ||
        c.code.toLowerCase().includes(query) ||
        c.currency.code.toLowerCase().includes(query) ||
        c.currency.name.toLowerCase().includes(query)
    );
  }, [countries, searchQuery]);

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
            Pilih negara
          </DialogTitle>
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
              placeholder="Cari negara atau mata uang"
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

          {/* Section: Transfer Lokal */}
          {!searchQuery && (
            <Box mb={4}>
              <Text
                fontSize="12px"
                fontWeight="700"
                color="#94A3B8"
                mb={2}
                textTransform="uppercase"
                letterSpacing="0.5px"
              >
                Transfer Lokal
              </Text>
              <Flex
                justify="space-between"
                align="center"
                p={3}
                borderRadius="10px"
                bg="#F8FAFC"
                opacity={0.65}
                cursor="not-allowed"
                border="1px solid #E7EDF5"
              >
                <HStack gap={3}>
                  <Text fontSize="20px">🇮🇩</Text>
                  <Box>
                    <Text fontSize="14px" fontWeight="700" color="#172B4D">
                      Indonesia
                    </Text>
                    <Text fontSize="11px" color="#64748B">
                      Negara Pengirim Utama
                    </Text>
                  </Box>
                </HStack>
                <Text fontSize="13px" fontWeight="700" color="#64748B">
                  IDR
                </Text>
              </Flex>
            </Box>
          )}

          {/* Section: Transfer Internasional */}
          <Box mb={4}>
            <Text
              fontSize="12px"
              fontWeight="700"
              color="#94A3B8"
              mb={2}
              textTransform="uppercase"
              letterSpacing="0.5px"
            >
              Transfer Internasional ({filteredCountries.length})
            </Text>

            <Box maxH="280px" overflowY="auto" pr={1}>
              {filteredCountries.length === 0 ? (
                <Box py={6} textAlign="center">
                  <Text fontSize="14px" color="#64748B">
                    Negara atau mata uang tidak ditemukan.
                  </Text>
                </Box>
              ) : (
                <VStack gap={1.5} align="stretch">
                  {filteredCountries.map((c) => {
                    const isSelected = c.code === selectedCountryCode;
                    return (
                      <Flex
                        key={c.code}
                        justify="space-between"
                        align="center"
                        p={3}
                        borderRadius="10px"
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
                          onSelectCountry(c);
                          onClose();
                          setSearchQuery("");
                        }}
                      >
                        <HStack gap={3}>
                          <Text fontSize="22px" lineHeight="1">
                            {c.flagEmoji}
                          </Text>
                          <Box textAlign="left">
                            <Text fontSize="14px" fontWeight="700" color="#172B4D">
                              {c.name}
                            </Text>
                            <Text fontSize="11px" color="#64748B">
                              {c.currency.name} ({c.currency.symbol})
                            </Text>
                          </Box>
                        </HStack>

                        <HStack gap={2}>
                          <Text
                            fontSize="14px"
                            fontWeight="700"
                            color={isSelected ? "#1688DB" : "#172B4D"}
                          >
                            {c.currency.code}
                          </Text>
                          {isSelected && <Check size={18} color="#269FEF" strokeWidth={2.5} />}
                        </HStack>
                      </Flex>
                    );
                  })}
                </VStack>
              )}
            </Box>
          </Box>

          {/* Bottom Banner */}
          <Box
            bg="#F5F8FC"
            p={3.5}
            borderRadius="12px"
            border="1px solid #E7EDF5"
            display="flex"
            gap={3}
            alignItems="start"
          >
            <Box p={1.5} borderRadius="8px" bg="#EAF6FF" color="#269FEF" flexShrink={0}>
              <Rocket size={16} />
            </Box>
            <Text fontSize="12px" color="#64748B" lineHeight="shorter">
              Negara atau mata uang yang kamu cari tidak ada? Kami terus menambah koridor pengiriman
              baru setiap bulannya.
            </Text>
          </Box>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
