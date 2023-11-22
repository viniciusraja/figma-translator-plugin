import { Tabs, TabList, Tab, TabPanels } from "@chakra-ui/react";
import TranslatorTabPanel from "../TranslatorTabPanel";
import MyLibraryPanel from "../MyLibraryPanel/MyLibraryPanel";

const TranslatorDashboard = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Translate</Tab>
        <Tab>My Library</Tab>
      </TabList>
      <TabPanels>
        <TranslatorTabPanel />
        <MyLibraryPanel />
      </TabPanels>
    </Tabs>
  );
};

export default TranslatorDashboard;
