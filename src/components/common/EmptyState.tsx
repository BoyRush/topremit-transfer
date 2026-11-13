import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Inbox } from "lucide-react";
import type { ReactNode } from "react";
import { PrimaryButton } from "./PrimaryButton";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  minH?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  minH = "280px",
}: EmptyStateProps) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH={minH}
      p={8}
      bg="#FFFFFF"
      borderRadius="16px"
      border="1px solid #E7EDF5"
      textAlign="center"
    >
      <VStack gap={4} maxW="380px">
        <Box
          p={4}
          borderRadius="full"
          bg="#EAF6FF"
          color="#269FEF"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {icon || <Inbox size={32} strokeWidth={1.5} />}
        </Box>

        <Box>
          <Text fontSize="16px" fontWeight="700" color="#172B4D">
            {title}
          </Text>
          <Text fontSize="13px" color="#64748B" mt={1} lineHeight="tall">
            {description}
          </Text>
        </Box>

        {actionLabel && onAction && (
          <PrimaryButton size="sm" onClick={onAction}>
            {actionLabel}
          </PrimaryButton>
        )}
      </VStack>
    </Flex>
  );
}
