import { Box, Flex, Text } from "@chakra-ui/react";
import { Check } from "lucide-react";

export interface StepItem {
  id: number;
  label: string;
  description?: string;
}

export const TRANSFER_STEPS: StepItem[] = [
  { id: 1, label: "Kalkulator", description: "Nominal & Kurs" },
  { id: 2, label: "Penerima", description: "Data Rekening" },
  { id: 3, label: "Review", description: "Konfirmasi & Bayar" },
  { id: 4, label: "Selesai", description: "Status Transfer" },
];

export interface TransactionStepperProps {
  currentStep: number;
  steps?: StepItem[];
}

export function TransactionStepper({
  currentStep,
  steps = TRANSFER_STEPS,
}: TransactionStepperProps) {
  return (
    <Box w="100%" py={4} mb={6}>
      <Flex align="center" justify="space-between" position="relative" maxW="720px" mx="auto">
        {/* Background connector line */}
        <Box
          position="absolute"
          top="18px"
          left="24px"
          right="24px"
          h="2px"
          bg="#E7EDF5"
          zIndex={0}
        />

        {/* Active progress connector line */}
        <Box
          position="absolute"
          top="18px"
          left="24px"
          w={`${Math.max(0, Math.min(100, ((currentStep - 1) / (steps.length - 1)) * 100))}%`}
          h="2px"
          bg="#269FEF"
          zIndex={0}
          transition="all 0.3s ease"
        />

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <Flex
              key={step.id}
              direction="column"
              align="center"
              zIndex={1}
              position="relative"
              px={2}
            >
              {/* Step Circle Indicator */}
              <Box
                w="36px"
                h="36px"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="700"
                fontSize="14px"
                transition="all 0.25s ease"
                bg={isCompleted ? "#16A34A" : isCurrent ? "#269FEF" : "#FFFFFF"}
                color={isCompleted || isCurrent ? "#FFFFFF" : "#64748B"}
                border="2px solid"
                borderColor={isCompleted ? "#16A34A" : isCurrent ? "#269FEF" : "#E7EDF5"}
                boxShadow={
                  isCurrent
                    ? "0px 0px 0px 4px rgba(38, 159, 239, 0.2)"
                    : "0px 1px 3px rgba(15, 23, 42, 0.05)"
                }
              >
                {isCompleted ? <Check size={18} strokeWidth={2.5} /> : step.id}
              </Box>

              {/* Step Label (Desktop & Tablet) */}
              <Box textAlign="center" mt={2} display={{ base: "none", sm: "block" }}>
                <Text
                  fontSize="13px"
                  fontWeight={isCurrent ? "700" : isCompleted ? "600" : "500"}
                  color={isCurrent ? "#172B4D" : isCompleted ? "#16A34A" : "#64748B"}
                  whiteSpace="nowrap"
                >
                  {step.label}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </Flex>

      {/* Mobile Current Step Label */}
      <Box display={{ base: "block", sm: "none" }} textAlign="center" mt={3}>
        <Text fontSize="13px" fontWeight="700" color="#172B4D">
          Langkah {currentStep} dari {steps.length}: {steps[currentStep - 1]?.label}
        </Text>
      </Box>
    </Box>
  );
}
