import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export interface PageHeadingProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  actionSlot?: ReactNode;
}

export function PageHeading({
  title,
  subtitle,
  backHref,
  backLabel = "Kembali",
  actionSlot,
}: PageHeadingProps) {
  return (
    <Box mb={6}>
      {backHref && (
        <Box mb={3}>
          <Link href={backHref} style={{ textDecoration: "none" }}>
            <HStack
              gap={1.5}
              color="#269FEF"
              fontSize="13px"
              fontWeight="600"
              cursor="pointer"
              display="inline-flex"
              _hover={{ color: "#1688DB" }}
            >
              <ArrowLeft size={16} />
              <Text>{backLabel}</Text>
            </HStack>
          </Link>
        </Box>
      )}

      <Flex
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
        align={{ base: "start", sm: "center" }}
        gap={3}
      >
        <Box>
          <Heading
            as="h1"
            fontSize={{ base: "22px", md: "26px", lg: "28px" }}
            fontWeight="800"
            color="#172B4D"
            letterSpacing="-0.5px"
          >
            {title}
          </Heading>
          {subtitle && (
            <Text fontSize="14px" color="#64748B" mt={1}>
              {subtitle}
            </Text>
          )}
        </Box>

        {actionSlot && <Box flexShrink={0}>{actionSlot}</Box>}
      </Flex>
    </Box>
  );
}
