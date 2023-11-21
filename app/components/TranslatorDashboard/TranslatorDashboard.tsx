import { Tabs, TabList, Tab, TabPanels } from "@chakra-ui/react";
import TranslatorTabPanel from "../TranslatorTabPanel";

const TranslatorDashboard = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Translate</Tab>
        <Tab>My Library</Tab>
      </TabList>
      <TabPanels>
        <TranslatorTabPanel />
        <TranslatorTabPanel />
      </TabPanels>
    </Tabs>
  );
};

export default TranslatorDashboard;
