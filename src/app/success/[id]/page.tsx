import Link from "next/link";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { CheckCircle2, Clock, Home } from "lucide-react";
import { AppShell, MainContainer, PageHeading } from "@/components/layout";
import { PrimaryButton, SecondaryButton, TransactionStepper } from "@/components/common";
import { getTransactionById } from "@/services/transaction.service";

export const dynamic = "force-dynamic";

interface SuccessPageProps {
  params: Promise<{ id: string }>;
}

export default async function SuccessPage({ params }: SuccessPageProps) {
  const { id } = await params;
  const transaction = getTransactionById(id);

  return (
    <AppShell>
      <MainContainer maxW="800px">
        <PageHeading
          title="Money's on the way!"
          subtitle="Transaksi simulasi pengiriman uang Anda telah berhasil dibuat dan sedang diproses."
        />

        {/* Stepper: Step 4 */}
        <TransactionStepper currentStep={4} />

        <Box
          bg="#FFFFFF"
          p={{ base: 6, sm: 8 }}
          borderRadius="20px"
          border="1px solid #E7EDF5"
          boxShadow="0px 4px 16px rgba(15, 23, 42, 0.04)"
          textAlign="center"
          my={4}
        >
          <Flex justify="center" mb={4}>
            <Box
              w="64px"
              h="64px"
              borderRadius="full"
              bg="#DCFCE7"
              color="#16A34A"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CheckCircle2 size={36} strokeWidth={2.5} />
            </Box>
          </Flex>

          <Text fontSize="22px" fontWeight="800" color="#172B4D" mb={1}>
            Pengiriman Berhasil Diajukan
          </Text>
          <Text fontSize="14px" color="#64748B" mb={6}>
            ID Transaksi:{" "}
            <Text as="span" fontFamily="monospace" fontWeight="700" color="#269FEF">
              {id}
            </Text>
          </Text>

          {transaction && (
            <Box
              bg="#F5F8FC"
              p={5}
              borderRadius="16px"
              border="1px solid #E7EDF5"
              maxW="560px"
              mx="auto"
              textAlign="left"
              mb={6}
            >
              <VStack gap={3} align="stretch" fontSize="13px">
                <Flex justify="space-between" align="center">
                  <Text color="#64748B">Nama Penerima</Text>
                  <Text fontWeight="700" color="#172B4D">
                    {transaction.recipient.fullName}
                  </Text>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text color="#64748B">Bank & No. Rekening</Text>
                  <Text fontWeight="600" color="#172B4D">
                    {transaction.recipient.bankName} - {transaction.recipient.accountNumber}
                  </Text>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text color="#64748B">Penerima Menerima</Text>
                  <Text fontWeight="800" color="#16A34A" fontSize="15px">
                    {transaction.destinationCountry.currency.code}{" "}
                    {transaction.calculation.receiveAmountFx.toLocaleString("en-US")}
                  </Text>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text color="#64748B">Bank Pembayaran</Text>
                  <Text fontWeight="700" color="#172B4D">
                    {transaction.paymentBank.name}
                  </Text>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text color="#64748B">Total Pembayaran</Text>
                  <Text fontWeight="800" color="#269FEF" fontSize="16px">
                    IDR {transaction.calculation.totalPaymentIdr.toLocaleString("id-ID")}
                  </Text>
                </Flex>
              </VStack>
            </Box>
          )}

          <HStack justify="center" gap={3} flexWrap="wrap">
            <Link href="/" style={{ textDecoration: "none" }}>
              <PrimaryButton leftIcon={<Home size={16} />}>Kirim Uang Lagi</PrimaryButton>
            </Link>
            <Link href="/history" style={{ textDecoration: "none" }}>
              <SecondaryButton leftIcon={<Clock size={16} />}>Lihat Riwayat</SecondaryButton>
            </Link>
          </HStack>
        </Box>
      </MainContainer>
    </AppShell>
  );
}
