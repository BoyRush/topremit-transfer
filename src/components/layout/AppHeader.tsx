"use client";

import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, Clock, HelpCircle, Send, User } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useT } from "@/store/lang-store";
import { useTransferStore } from "@/store/transfer-store";

export function AppHeader() {
  const pathname = usePathname();
  const T = useT();
  const resetDraft = useTransferStore((s) => s.resetDraft);

  const isTransferActive = pathname === "/" || pathname.startsWith("/transfer");
  const isHistoryActive = pathname.startsWith("/history");

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={100}
      bg="#FFFFFF"
      borderBottom="1px solid #E7EDF5"
      boxShadow="0px 1px 3px rgba(15, 23, 42, 0.05)"
    >
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
        <Flex h="68px" alignItems="center" justifyContent="space-between">
          {/* Logo Brand */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <HStack gap={2.5} cursor="pointer" alignItems="center">
              <Box
                w="36px"
                h="36px"
                bg="linear-gradient(135deg, #269FEF 0%, #1688DB 100%)"
                borderRadius="10px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="#FFFFFF"
                boxShadow="0px 4px 10px rgba(38, 159, 239, 0.3)"
              >
                <ArrowLeftRight size={20} strokeWidth={2.5} />
              </Box>
              <Box>
                <Text
                  fontSize="22px"
                  fontWeight="800"
                  letterSpacing="-0.5px"
                  color="#172B4D"
                  lineHeight="1"
                >
                  top<span style={{ color: "#269FEF" }}>remit</span>
                </Text>
                <Text fontSize="10px" color="#64748B" fontWeight="medium" letterSpacing="0.2px">
                  {T("app.tagline")}
                </Text>
              </Box>
            </HStack>
          </Link>

          {/* Desktop Navigation */}
          <HStack gap={1} display={{ base: "none", md: "flex" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <HStack
                px={4}
                py={2}
                borderRadius="8px"
                gap={2}
                bg={isTransferActive ? "#EAF6FF" : "transparent"}
                color={isTransferActive ? "#1688DB" : "#64748B"}
                fontWeight={isTransferActive ? "600" : "500"}
                fontSize="14px"
                transition="all 0.15s ease"
                _hover={{ bg: "#EAF6FF", color: "#1688DB" }}
              >
                <Send size={16} />
                <Text>{T("nav.send_money")}</Text>
              </HStack>
            </Link>

            <Link href="/history" style={{ textDecoration: "none" }}>
              <HStack
                px={4}
                py={2}
                borderRadius="8px"
                gap={2}
                bg={isHistoryActive ? "#EAF6FF" : "transparent"}
                color={isHistoryActive ? "#1688DB" : "#64748B"}
                fontWeight={isHistoryActive ? "600" : "500"}
                fontSize="14px"
                transition="all 0.15s ease"
                _hover={{ bg: "#EAF6FF", color: "#1688DB" }}
              >
                <Clock size={16} />
                <Text>{T("nav.history")}</Text>
              </HStack>
            </Link>

            <Link href="/help" style={{ textDecoration: "none" }}>
              <HStack
                px={4}
                py={2}
                borderRadius="8px"
                gap={2}
                bg="transparent"
                color="#64748B"
                fontWeight="500"
                fontSize="14px"
                transition="all 0.15s ease"
                _hover={{ bg: "#F5F8FC", color: "#172B4D" }}
              >
                <HelpCircle size={16} />
                <Text>{T("nav.help")}</Text>
              </HStack>
            </Link>
          </HStack>

          {/* Right: Language Switcher + New Transfer + Profile */}
          <HStack gap={2}>
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* New Transfer Button — resets draft without touching history */}
            {(pathname.startsWith("/recipient") ||
              pathname.startsWith("/review") ||
              pathname.startsWith("/success")) && (
              <Link href="/" style={{ textDecoration: "none" }}>
                <button
                  type="button"
                  onClick={resetDraft}
                  title="Start a new transfer"
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: 700,
                    border: "1.5px solid #E7EDF5",
                    background: "#F8FAFC",
                    color: "#64748B",
                    cursor: "pointer",
                    display: "none", // shown via media query below
                  }}
                >
                  {T("nav.send_money")}
                </button>
              </Link>
            )}

            {/* Profile Avatar Pill */}
            <HStack
              bg="#FFFFFF"
              border="1px solid #E7EDF5"
              borderRadius="full"
              px={3}
              py={1.5}
              gap={2}
              cursor="pointer"
              transition="all 0.15s ease"
              _hover={{ borderColor: "#269FEF", boxShadow: "0px 2px 6px rgba(38,159,239,0.15)" }}
            >
              <Box
                w="24px"
                h="24px"
                borderRadius="full"
                bg="#EAF6FF"
                color="#269FEF"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <User size={14} />
              </Box>
              <Text
                fontSize="13px"
                fontWeight="600"
                color="#0F172A"
                display={{ base: "none", sm: "block" }}
              >
                {T("nav.user_placeholder")}
              </Text>
            </HStack>
          </HStack>
        </Flex>
      </Box>

      {/* Mobile Sub-Navigation Bar */}
      <Box
        display={{ base: "flex", md: "none" }}
        borderTop="1px solid #E7EDF5"
        px={4}
        py={2}
        justifyContent="space-around"
        bg="#FFFFFF"
      >
        <Link href="/" style={{ textDecoration: "none", flex: 1 }}>
          <Flex
            direction="column"
            align="center"
            py={1}
            color={isTransferActive ? "#1688DB" : "#64748B"}
          >
            <Send size={18} />
            <Text fontSize="11px" fontWeight={isTransferActive ? "600" : "500"} mt={1}>
              {T("nav.send_money")}
            </Text>
          </Flex>
        </Link>

        <Link href="/history" style={{ textDecoration: "none", flex: 1 }}>
          <Flex
            direction="column"
            align="center"
            py={1}
            color={isHistoryActive ? "#1688DB" : "#64748B"}
          >
            <Clock size={18} />
            <Text fontSize="11px" fontWeight={isHistoryActive ? "600" : "500"} mt={1}>
              {T("nav.history")}
            </Text>
          </Flex>
        </Link>
      </Box>
    </Box>
  );
}
