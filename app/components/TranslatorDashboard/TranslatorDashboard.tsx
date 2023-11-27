import { TabList, Tab, TabPanels, VStack } from "@chakra-ui/react";
import TranslatorTabPanel from "../TranslatorTabPanel";
import MyLibraryPanel from "../MyLibraryPanel/MyLibraryPanel";
import Header from "./Header";
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
