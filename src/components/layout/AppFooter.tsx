import { Box, Container, Flex, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { CheckCircle2, Lock, Shield } from "lucide-react";

export function AppFooter() {
  return (
    <Box as="footer" bg="#FFFFFF" borderTop="1px solid #E7EDF5" mt="auto" py={10}>
      <Container maxW="1200px" px={{ base: 4, md: 6, lg: 8 }}>
        {/* Trust Badges */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} pb={8} borderBottom="1px solid #E7EDF5">
          <HStack gap={3.5} align="start">
            <Box p={2.5} borderRadius="12px" bg="#EAF6FF" color="#269FEF" flexShrink={0}>
              <Shield size={20} />
            </Box>
            <Box>
              <Text fontSize="14px" fontWeight="700" color="#172B4D">
                Berlisensi Resmi
              </Text>
              <Text fontSize="12px" color="#64748B" mt={0.5} lineHeight="shorter">
                Simulasi terdaftar & diawasi sesuai regulasi remitansi Bank Indonesia.
              </Text>
            </Box>
          </HStack>

          <HStack gap={3.5} align="start">
            <Box p={2.5} borderRadius="12px" bg="#EAF6FF" color="#269FEF" flexShrink={0}>
              <Lock size={20} />
            </Box>
            <Box>
              <Text fontSize="14px" fontWeight="700" color="#172B4D">
                Keamanan 256-bit SSL
              </Text>
              <Text fontSize="12px" color="#64748B" mt={0.5} lineHeight="shorter">
                Setiap data transaksi dienkripsi dengan standar perbankan global.
              </Text>
            </Box>
          </HStack>

          <HStack gap={3.5} align="start">
            <Box p={2.5} borderRadius="12px" bg="#EAF6FF" color="#269FEF" flexShrink={0}>
              <CheckCircle2 size={20} />
            </Box>
            <Box>
              <Text fontSize="14px" fontWeight="700" color="#172B4D">
                Transparan & Tanpa Biaya Tersembunyi
              </Text>
              <Text fontSize="12px" color="#64748B" mt={0.5} lineHeight="shorter">
                Kurs kompetitif dan biaya transfer selalu diinformasikan di awal.
              </Text>
            </Box>
          </HStack>
        </SimpleGrid>

        {/* Links & Legal */}
        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align={{ base: "center", sm: "center" }}
          pt={6}
          gap={4}
          fontSize="12px"
          color="#64748B"
        >
          <VStack align={{ base: "center", sm: "start" }} gap={1}>
            <Text fontWeight="600" color="#172B4D">
              © {new Date().getFullYear()} Topremit Money Transfer Prototype.
            </Text>
            <Text fontSize="11px" color="#94A3B8">
              Prototipe Web Frontend fungsional untuk simulasi pengiriman uang internasional.
            </Text>
          </VStack>

          <HStack gap={5} flexWrap="wrap" justify="center">
            <Link href="/help" style={{ textDecoration: "none", color: "#64748B" }}>
              Pusat Bantuan
            </Link>
            <Link href="/privacy" style={{ textDecoration: "none", color: "#64748B" }}>
              Kebijakan Privasi
            </Link>
            <Link href="/terms" style={{ textDecoration: "none", color: "#64748B" }}>
              Syarat & Ketentuan
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
