import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { AlertTriangle } from "lucide-react";
import { SecondaryButton } from "./SecondaryButton";

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  minH?: string;
}

export function ErrorState({
  title = "Terjadi Kendala",
  message,
  onRetry,
  retryLabel = "Coba Lagi",
  minH = "240px",
}: ErrorStateProps) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH={minH}
      p={8}
      bg="#FFFFFF"
      borderRadius="16px"
      border="1px solid #FEE2E2"
      textAlign="center"
    >
      <VStack gap={4} maxW="380px">
        <Box
          p={3.5}
          borderRadius="full"
          bg="#FEE2E2"
          color="#DC2626"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <AlertTriangle size={28} />
        </Box>

        <Box>
          <Text fontSize="16px" fontWeight="700" color="#172B4D">
            {title}
          </Text>
          <Text fontSize="13px" color="#64748B" mt={1} lineHeight="tall">
            {message}
          </Text>
        </Box>

        {onRetry && (
          <SecondaryButton size="sm" variant="subtle" onClick={onRetry}>
            {retryLabel}
          </SecondaryButton>
        )}
      </VStack>
    </Flex>
  );
}
