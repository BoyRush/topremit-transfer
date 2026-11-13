"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Box, Flex, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { ArrowRight, ChevronRight, History, Search, Send, X } from "lucide-react";
import { AppShell, MainContainer, PageHeading } from "@/components/layout";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  PrimaryButton,
  StatusBadge,
} from "@/components/common";
import { useTransactions } from "@/hooks/useTransactions";

type FilterStatusTab = "ALL" | "PROCESSING" | "COMPLETED" | "PENDING";

export function TransactionHistoryView() {
  const router = useRouter();
  const { transactions, isLoading, isError, error, refetch } = useTransactions();

  const [activeTab, setActiveTab] = React.useState<FilterStatusTab>("ALL");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const formatIdr = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  const formatFx = (val: number, currency: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(val);

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(d);
    } catch {
      return isoString;
    }
  };

  // Filtered transactions
  const filteredTransactions = React.useMemo(() => {
    let list = transactions;

    if (activeTab !== "ALL") {
      list = list.filter((tx) => tx.status === activeTab);
    }

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (tx) =>
          tx.transactionReference.toLowerCase().includes(q) ||
          tx.recipient.fullName.toLowerCase().includes(q) ||
          tx.destinationCountry.name.toLowerCase().includes(q) ||
          tx.destinationCountry.code.toLowerCase().includes(q) ||
          tx.destinationCurrency.toLowerCase().includes(q)
      );
    }

    return list;
  }, [transactions, activeTab, searchQuery]);

  // Tab counts
  const tabCounts = React.useMemo(() => {
    return {
      ALL: transactions.length,
      PROCESSING: transactions.filter((t) => t.status === "PROCESSING").length,
      COMPLETED: transactions.filter((t) => t.status === "COMPLETED").length,
      PENDING: transactions.filter((t) => t.status === "PENDING").length,
    };
  }, [transactions]);

  const tabs: { key: FilterStatusTab; label: string }[] = [
    { key: "ALL", label: "Semua" },
    { key: "PROCESSING", label: "Sedang Diproses" },
    { key: "COMPLETED", label: "Selesai" },
    { key: "PENDING", label: "Menunggu" },
  ];

  return (
    <AppShell>
      <MainContainer maxW="980px">
        {/* Header with Title and "Kirim Uang" Action */}
        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align={{ base: "flex-start", sm: "center" }}
          gap={4}
          mb={6}
        >
          <PageHeading
            title="Your past transfers"
            subtitle="Pantau status pengiriman dana dan rincian transaksi pengiriman uang internasional Anda."
          />
          <Link href="/" style={{ textDecoration: "none" }}>
            <PrimaryButton leftIcon={<Send size={16} />}>Kirim Uang</PrimaryButton>
          </Link>
        </Flex>

        {/* Search & Tabs Card */}
        <Box
          bg="#FFFFFF"
          p={4}
          borderRadius="16px"
          border="1px solid #E7EDF5"
          boxShadow="0px 2px 8px rgba(15, 23, 42, 0.03)"
          mb={6}
        >
          {/* Search Bar */}
          <Box position="relative" mb={4}>
            <Box
              position="absolute"
              left="12px"
              top="50%"
              transform="translateY(-50%)"
              color="#94A3B8"
              pointerEvents="none"
              display="flex"
              alignItems="center"
            >
              <Search size={16} />
            </Box>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan nomor referensi, nama penerima, atau negara..."
              pl="38px"
              pr={searchQuery ? "36px" : "12px"}
              fontSize="13px"
              borderRadius="10px"
              borderColor="#E2E8F0"
              _focus={{
                borderColor: "#269FEF",
                boxShadow: "0 0 0 1px #269FEF",
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                title="Hapus pencarian"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#94A3B8",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <X size={16} />
              </button>
            )}
          </Box>

          {/* Status Tabs */}
          <HStack gap={2} flexWrap="wrap">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              const count = tabCounts[tab.key];
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: isActive ? 700 : 500,
                    border: isActive ? "1px solid #269FEF" : "1px solid #E2E8F0",
                    background: isActive ? "#EAF6FF" : "#F8FAFC",
                    color: isActive ? "#1688DB" : "#64748B",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span>{tab.label}</span>
                  <span
                    style={{
                      fontSize: "11px",
                      background: isActive ? "#269FEF" : "#E2E8F0",
                      color: isActive ? "#FFFFFF" : "#475569",
                      padding: "1px 6px",
                      borderRadius: "10px",
                      fontWeight: 700,
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </HStack>
        </Box>

        {/* Content Section: Loading, Error, Empty, or List */}
        {isLoading ? (
          <Box bg="#FFFFFF" p={8} borderRadius="16px" border="1px solid #E7EDF5">
            <LoadingState message="Memuat riwayat transaksi pengiriman..." />
          </Box>
        ) : isError ? (
          <ErrorState
            title="Gagal Memuat Riwayat Transaksi"
            message={error instanceof Error ? error.message : "Terjadi kesalahan saat memuat data"}
            onRetry={refetch}
          />
        ) : transactions.length === 0 ? (
          <EmptyState
            icon={<History size={36} />}
            title="Belum Ada Riwayat Transaksi"
            description="Anda belum pernah melakukan simulasi pengiriman uang. Mulai sekarang untuk merasakan kemudahan kirim uang internasional."
            actionLabel="Kirim Uang Sekarang"
            onAction={() => router.push("/")}
          />
        ) : filteredTransactions.length === 0 ? (
          <EmptyState
            icon={<Search size={36} />}
            title="Tidak Ada Transaksi Ditemukan"
            description={`Tidak ada transaksi yang cocok dengan pencarian "${searchQuery}" pada filter ini.`}
            actionLabel="Reset Pencarian & Filter"
            onAction={() => {
              setSearchQuery("");
              setActiveTab("ALL");
            }}
          />
        ) : (
          <VStack gap={3.5} align="stretch">
            {filteredTransactions.map((tx) => (
              <Box
                key={tx.id}
                as="div"
                onClick={() => router.push(`/history/${encodeURIComponent(tx.id)}`)}
                bg="#FFFFFF"
                p={{ base: 4, sm: 5 }}
                borderRadius="14px"
                border="1px solid #E7EDF5"
                boxShadow="0px 2px 6px rgba(15, 23, 42, 0.02)"
                cursor="pointer"
                transition="all 0.15s ease"
                _hover={{
                  borderColor: "#269FEF",
                  boxShadow: "0px 4px 12px rgba(38, 159, 239, 0.1)",
                  transform: "translateY(-1px)",
                }}
              >
                <Flex
                  direction={{ base: "column", sm: "row" }}
                  justify="space-between"
                  align={{ base: "flex-start", sm: "center" }}
                  gap={4}
                >
                  {/* Left Column: Flag, Reference, Recipient, Date */}
                  <HStack gap={3.5} align="center">
                    <Box
                      fontSize="28px"
                      lineHeight="1"
                      p={2}
                      borderRadius="10px"
                      bg="#F8FAFC"
                      border="1px solid #E2E8F0"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {tx.destinationCountry.flagEmoji}
                    </Box>

                    <Box>
                      <HStack gap={2} mb={0.5}>
                        <Text fontSize="14px" fontWeight="700" color="#172B4D">
                          {tx.recipient.fullName}
                        </Text>
                        <Text fontSize="12px" color="#94A3B8">
                          •
                        </Text>
                        <Text fontSize="12px" color="#64748B">
                          {tx.destinationCountry.name}
                        </Text>
                      </HStack>

                      <HStack gap={2} fontSize="12px" color="#64748B">
                        <Text fontFamily="monospace" fontWeight="600" color="#1688DB">
                          {tx.transactionReference}
                        </Text>
                        <span>•</span>
                        <span>{formatDate(tx.createdAt)}</span>
                      </HStack>
                    </Box>
                  </HStack>

                  {/* Right Column: Amounts & Status Badge */}
                  <Flex
                    direction={{ base: "row", sm: "column" }}
                    justify={{ base: "space-between", sm: "flex-end" }}
                    align={{ base: "center", sm: "flex-end" }}
                    w={{ base: "100%", sm: "auto" }}
                    gap={2}
                  >
                    <Box textAlign={{ base: "left", sm: "right" }}>
                      <Text fontSize="14px" fontWeight="800" color="#172B4D">
                        {formatIdr(tx.sendAmount)}
                      </Text>
                      <HStack
                        gap={1}
                        justify={{ base: "flex-start", sm: "flex-end" }}
                        fontSize="12px"
                        color="#16A34A"
                        fontWeight="700"
                      >
                        <ArrowRight size={12} />
                        <span>{formatFx(tx.receiveAmount, tx.destinationCurrency)}</span>
                      </HStack>
                    </Box>

                    <HStack gap={2}>
                      <StatusBadge status={tx.status} />
                      <Box color="#94A3B8" display={{ base: "none", sm: "flex" }}>
                        <ChevronRight size={18} />
                      </Box>
                    </HStack>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </VStack>
        )}
      </MainContainer>
    </AppShell>
  );
}
