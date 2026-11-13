import { Box, Container, type ContainerProps } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export interface MainContainerProps extends PropsWithChildren<ContainerProps> {
  maxW?: string;
}

export function MainContainer({ children, maxW = "1000px", ...rest }: MainContainerProps) {
  return (
    <Box as="main" flex="1" py={{ base: 6, md: 8, lg: 10 }}>
      <Container maxW={maxW} px={{ base: 4, sm: 6, lg: 8 }} mx="auto" {...rest}>
        {children}
      </Container>
    </Box>
  );
}
