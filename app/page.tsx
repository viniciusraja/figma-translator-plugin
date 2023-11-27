"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import TranslatorDashboard from "./components/TranslatorDashboard";
import theme from "./theme";

export default function Plugin() {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <TranslatorDashboard />
      </ChakraProvider>
    </CacheProvider>
  );
}
