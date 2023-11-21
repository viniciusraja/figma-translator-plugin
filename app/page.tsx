"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import TranslatorDashboard from "./components/TranslatorDashboard";

export default function Plugin() {
  return (
    <CacheProvider>
      <ChakraProvider>
        <TranslatorDashboard />
      </ChakraProvider>
    </CacheProvider>
  );
}
