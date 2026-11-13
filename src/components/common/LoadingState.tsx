import { Box, Flex, Spinner, Text, VStack } from "@chakra-ui/react";

export interface LoadingStateProps {
  message?: string;
  subMessage?: string;
  minH?: string;
}

export function LoadingState({
  message = "Memuat data...",
  subMessage = "Mohon tunggu sebentar",
  minH = "240px",
}: LoadingStateProps) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH={minH}
      p={6}
      bg="#FFFFFF"
      borderRadius="16px"
      border="1px solid #E7EDF5"
    >
      <VStack gap={3}>
        <Spinner size="lg" color="#269FEF" />
        <Box textAlign="center">
          <Text fontSize="15px" fontWeight="700" color="#172B4D">
            {message}
          </Text>
          {subMessage && (
            <Text fontSize="13px" color="#64748B" mt={0.5}>
              {subMessage}
            </Text>
          )}
        </Box>
      </VStack>
    </Flex>
  );
}
