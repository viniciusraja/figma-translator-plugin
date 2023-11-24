import { Icon, VStack } from "@chakra-ui/react";
import { useFieldArray } from "react-hook-form";
import MyLibraryItem from "../MyLibraryItem";
import { GrAdd } from "react-icons/gr";
import { myLibraryItemDefault } from "../form/myLibraryFormDefaults";

const MyLibraryList = () => {
  const { fields, append } = useFieldArray({ name: "my_library" });

  return (
    <VStack alignItems={"center"}>
      {fields?.map((field, index) => (
        <MyLibraryItem key={field?.id} name={`my_library.${index}`} />
      ))}
      <Icon
        as={GrAdd}
        cursor="pointer"
        onClick={() => append(myLibraryItemDefault)}
        mt="4"
      />
    </VStack>
  );
};

export default MyLibraryList;
