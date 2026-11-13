import Link from "next/link";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { AppShell, MainContainer } from "@/components/layout";
import { PrimaryButton } from "@/components/common";

export default function NotFound() {
  return (
    <AppShell>
      <MainContainer maxW="600px">
        <Box
          bg="#FFFFFF"
          p={10}
          borderRadius="20px"
          border="1px solid #E7EDF5"
          textAlign="center"
          boxShadow="0px 4px 20px rgba(15, 23, 42, 0.05)"
          my={8}
        >
          <VStack gap={4}>
            <Text fontSize="54px" fontWeight="800" color="#269FEF" lineHeight="1">
              404
            </Text>
            <Heading as="h1" fontSize="22px" fontWeight="800" color="#172B4D">
              Halaman Tidak Ditemukan
            </Heading>
            <Text fontSize="14px" color="#64748B" maxW="400px" lineHeight="tall">
              Halaman yang Anda tuju tidak tersedia atau telah dipindahkan. Silakan kembali ke
              halaman kalkulator utama.
            </Text>
            <Box pt={3}>
              <Link href="/" style={{ textDecoration: "none" }}>
                <PrimaryButton size="md">Kembali ke Kalkulator</PrimaryButton>
              </Link>
            </Box>
          </VStack>
        </Box>
      </MainContainer>
    </AppShell>
  );
}
