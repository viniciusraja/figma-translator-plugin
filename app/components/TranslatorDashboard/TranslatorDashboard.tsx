import { VStack } from "@chakra-ui/react";
import TranslatorAppsList from "./TranslatorAppsList";

const TranslatorDashboard = () => {
  return (
    <VStack w="100%">
      <VStack w="100%" py="8px">
        <TranslatorAppsList />
      </VStack>
    </VStack>
  );
};

export default TranslatorDashboard;
