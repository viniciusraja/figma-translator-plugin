import { TabPanel } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import MyLibraryList from "./MyLibraryList";

const MyLibraryPanel = () => {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <TabPanel p="4">
        <MyLibraryList />
      </TabPanel>
    </FormProvider>
  );
};

export default MyLibraryPanel;
