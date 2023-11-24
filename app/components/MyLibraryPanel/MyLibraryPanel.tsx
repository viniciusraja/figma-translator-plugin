import { TabPanel } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import MyLibraryList from "./MyLibraryList";
import { useEffect } from "react";
import useMyLibraryStore, { MyLibraryStore } from "./store/myLibraryStore";
import myLibraryFormDefaults from "./form/myLibraryFormDefaults";

type MyLibraryFormDefaults = {
  my_library: MyLibraryStore;
};

const MyLibraryPanel = () => {
  const { watch, ...form } = useForm<MyLibraryFormDefaults>({
    defaultValues: myLibraryFormDefaults,
  });

  const setMyLibrary = useMyLibraryStore((state) => state.setMyLibrary);

  const currentLibraryState = watch("my_library");

  useEffect(() => {
    if (Object.values(currentLibraryState).length > 0)
      setMyLibrary(currentLibraryState);
  }, [currentLibraryState]);

  return (
    <FormProvider {...{ watch, ...form }}>
      <TabPanel p="4">
        <MyLibraryList />
      </TabPanel>
    </FormProvider>
  );
};

export default MyLibraryPanel;
