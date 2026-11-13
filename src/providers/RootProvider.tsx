"use client";

import type { PropsWithChildren } from "react";
import { QueryProvider } from "./QueryProvider";
import { ChakraClientProvider } from "@/components/ui/provider";

export function RootProvider({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ChakraClientProvider>{children}</ChakraClientProvider>
    </QueryProvider>
  );
}
