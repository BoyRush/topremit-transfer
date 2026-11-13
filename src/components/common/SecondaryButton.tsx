"use client";

import { Button as ChakraButton, HStack, Spinner } from "@chakra-ui/react";
import * as React from "react";

export interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "outline" | "subtle";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const SecondaryButton = React.forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  function SecondaryButton(
    {
      isLoading = false,
      isFullWidth = false,
      leftIcon,
      rightIcon,
      variant = "outline",
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

    const variantStyles =
      variant === "subtle"
        ? {
            backgroundColor: "#EAF6FF",
            color: "#1688DB",
            border: "1px solid #D8EDFF",
          }
        : {
            backgroundColor: "#FFFFFF",
            color: "#172B4D",
            border: "1px solid #E7EDF5",
          };

    return (
      <ChakraButton
        ref={ref}
        disabled={disabled || isLoading}
        style={{
          width: isFullWidth ? "100%" : "auto",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "600",
          cursor: disabled || isLoading ? "not-allowed" : "pointer",
          transition: "all 0.15s ease",
          ...sizeStyles,
          ...variantStyles,
          ...rest.style,
        }}
        _hover={{
          backgroundColor: variant === "subtle" ? "#D8EDFF" : "#F5F8FC",
          borderColor: "#269FEF",
          color: "#1688DB",
        }}
        _active={{
          transform: disabled ? "none" : "scale(0.99)",
        }}
        {...(rest as Record<string, unknown>)}
      >
        {isLoading ? (
          <HStack gap={2}>
            <Spinner size="sm" color="#1688DB" />
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
