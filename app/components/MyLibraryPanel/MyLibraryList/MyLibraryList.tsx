import { Icon, VStack } from "@chakra-ui/react";
import { useFieldArray } from "react-hook-form";
import MyLibraryItem from "../MyLibraryItem";
import { GrAdd } from "react-icons/gr";

const MyLibraryList = () => {
  const { fields, append } = useFieldArray({ name: "my-library" });
  return (
    <VStack alignItems={"center"}>
      {fields?.map((field) => <MyLibraryItem name={field?.id} />)}
      <Icon as={GrAdd} cursor="pointer" onClick={append} mt="4" />
    </VStack>
  );
};

export default MyLibraryList;
