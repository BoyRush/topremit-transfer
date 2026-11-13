import { Box } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";

export interface AppShellProps extends PropsWithChildren {
  showFooter?: boolean;
}

export function AppShell({ children, showFooter = true }: AppShellProps) {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="#F5F8FC">
      <AppHeader />
      <Box flex="1" display="flex" flexDirection="column">
        {children}
      </Box>
      {showFooter && <AppFooter />}
    </Box>
  );
}
