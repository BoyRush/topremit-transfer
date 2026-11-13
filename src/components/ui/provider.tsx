"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { system } from "@/theme/theme";
import type { PropsWithChildren } from "react";

export function ChakraClientProvider({ children }: PropsWithChildren) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
}
