import { Box, Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { ArrowRight, Globe, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <Box minH="100vh" bg="#F5F8FC" py={12} px={4}>
      <Container maxW="3xl">
        <VStack
          gap={6}
          align="stretch"
          bg="white"
          p={8}
          borderRadius="16px"
          boxShadow="sm"
          border="1px solid #E7EDF5"
        >
          <Box display="flex" alignItems="center" gap={3}>
            <Box
              bg="#269FEF"
              color="white"
              p={2}
              borderRadius="10px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Globe size={24} />
            </Box>
            <Heading as="h1" size="xl" color="#172B4D" fontWeight="bold">
              Topremit International Transfer
            </Heading>
          </Box>

          <Text color="#64748B" fontSize="md" lineHeight="tall">
            Simulasi pengiriman uang internasional ke lebih dari 50+ negara di dunia. Cepat, murah,
            transparan, dan terinspirasi oleh antarmuka modern Topremit.
          </Text>

          <Box
            bg="#EAF6FF"
            p={4}
            borderRadius="12px"
            border="1px solid #D8EDFF"
            display="flex"
            gap={3}
            alignItems="center"
          >
            <ShieldCheck color="#269FEF" size={24} />
            <Text color="#0F6BB0" fontSize="sm">
              Lingkungan prototipe terverifikasi: Next.js 16 App Router, React 19, Chakra UI v3,
              Zustand v5, dan TanStack Query v5.
            </Text>
          </Box>

          <Box display="flex" gap={4} pt={4}>
            <Link href="/transfer" passHref style={{ textDecoration: "none" }}>
              <Button
                bg="#269FEF"
                color="white"
                _hover={{ bg: "#1688DB" }}
                px={6}
                py={3}
                borderRadius="10px"
                fontWeight="semibold"
              >
                Mulai Transfer <ArrowRight size={18} style={{ marginLeft: "8px" }} />
              </Button>
            </Link>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
