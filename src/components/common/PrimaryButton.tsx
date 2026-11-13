"use client";

import { Button as ChakraButton, Spinner, HStack } from "@chakra-ui/react";
import * as React from "react";

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  function PrimaryButton(
    {
      isLoading = false,
      isFullWidth = false,
      leftIcon,
      rightIcon,
      size = "md",
      children,
      disabled,
      ...rest
    },
    ref
  ) {
    const sizeStyles = {
      sm: { height: "38px", fontSize: "13px", px: "14px", borderRadius: "8px" },
      md: { height: "46px", fontSize: "15px", px: "20px", borderRadius: "10px" },
      lg: { height: "52px", fontSize: "16px", px: "24px", borderRadius: "12px" },
    }[size];

    return (
      <ChakraButton
        ref={ref}
        disabled={disabled || isLoading}
        style={{
          width: isFullWidth ? "100%" : "auto",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: disabled ? "#CBD5E1" : "#269FEF",
          color: "#FFFFFF",
          fontWeight: "600",
          border: "none",
          cursor: disabled || isLoading ? "not-allowed" : "pointer",
          boxShadow: disabled ? "none" : "0px 4px 12px rgba(38, 159, 239, 0.25)",
          transition: "all 0.15s ease",
          ...sizeStyles,
          ...rest.style,
        }}
        _hover={{
          backgroundColor: disabled ? "#CBD5E1" : "#1688DB",
          boxShadow: disabled ? "none" : "0px 6px 16px rgba(22, 136, 219, 0.35)",
        }}
        _active={{
          backgroundColor: disabled ? "#CBD5E1" : "#0F6BB0",
          transform: disabled ? "none" : "scale(0.99)",
        }}
        {...(rest as Record<string, unknown>)}
      >
        {isLoading ? (
          <HStack gap={2}>
            <Spinner size="sm" color="white" />
            <span>Memproses...</span>
          </HStack>
        ) : (
          <HStack gap={2}>
            {leftIcon}
            <span>{children}</span>
            {rightIcon}
          </HStack>
        )}
      </ChakraButton>
    );
  }
);
