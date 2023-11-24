import { HStack, Icon } from "@chakra-ui/react";
import { IoIosArrowRoundForward } from "react-icons/io";
import MyLibraryTextItem from "../MyLibraryTextItem/MyLibraryTextItem";
import saveTranslationToMyLibrary from "../utils/saveTranslationToMyLibrary";
import { useFormContext } from "react-hook-form";

type MyLibraryItemProps = {
  name: string;
};

const MyLibraryItem = ({ name }: MyLibraryItemProps) => {
  const myLibraryNames = {
    original: `${name}.original`,
    translation: `${name}.translation`,
  };
  const { watch } = useFormContext();

  const handleSaveKeyToUserLibrary = () => {
    const originalText = watch(myLibraryNames.original);
    const translatedText = watch(myLibraryNames.translation);

    saveTranslationToMyLibrary(originalText, translatedText);
  };
  return (
    <HStack justifyContent="space-between" w="100%">
      <MyLibraryTextItem
        name={myLibraryNames.original}
        onConfirm={handleSaveKeyToUserLibrary}
      />
      <Icon as={IoIosArrowRoundForward} />
      <MyLibraryTextItem
        name={myLibraryNames.translation}
        onConfirm={handleSaveKeyToUserLibrary}
      />
    </HStack>
  );
};

export default MyLibraryItem;
