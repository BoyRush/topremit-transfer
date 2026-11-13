import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { AlertCircle } from "lucide-react";
import type { PropsWithChildren, ReactNode } from "react";

export interface FormFieldProps extends PropsWithChildren {
  id?: string;
  label?: string;
  isRequired?: boolean;
  error?: string;
  helperText?: string;
  charCounter?: {
    current: number;
    max: number;
  };
  rightLabelAction?: ReactNode;
}

export function FormField({
  id,
  label,
  isRequired = false,
  error,
  helperText,
  charCounter,
  rightLabelAction,
  children,
}: FormFieldProps) {
  return (
    <Box w="100%" mb={4}>
      {(label || rightLabelAction) && (
        <Flex justify="space-between" align="center" mb={1.5}>
          {label && (
            <label
              htmlFor={id}
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#172B4D",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                cursor: id ? "pointer" : "default",
              }}
            >
              <span>{label}</span>
              {isRequired && <span style={{ color: "#DC2626", fontWeight: "bold" }}>*</span>}
            </label>
          )}

          {rightLabelAction && <Box>{rightLabelAction}</Box>}
        </Flex>
      )}

      {/* Field Input Slot */}
      <Box position="relative">{children}</Box>

      {/* Footer Info: Error / Helper and Character Counter */}
      <Flex justify="space-between" align="start" mt={1.5} gap={2}>
        <Box flex="1">
          {error ? (
            <HStack gap={1.5} color="#DC2626" fontSize="12px" fontWeight="500">
              <AlertCircle size={14} style={{ flexShrink: 0 }} />
              <Text>{error}</Text>
            </HStack>
          ) : helperText ? (
            <Text fontSize="12px" color="#64748B">
              {helperText}
            </Text>
          ) : null}
        </Box>

        {charCounter && (
          <Text
            fontSize="12px"
            fontWeight="500"
            color={charCounter.current > charCounter.max ? "#DC2626" : "#94A3B8"}
            whiteSpace="nowrap"
          >
            {charCounter.current}/{charCounter.max}
          </Text>
        )}
      </Flex>
    </Box>
  );
}
