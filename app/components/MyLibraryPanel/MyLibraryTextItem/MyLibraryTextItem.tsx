import { HStack, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { useWatch } from "react-hook-form";
import TextArea from "../../Form/TextArea";
import { BsCheck2 } from "react-icons/bs";

type MyLibraryTextItemProps = {
  name: string;
  onConfirm?: () => void;
};

const MyLibraryTextItem = ({ name, onConfirm }: MyLibraryTextItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const myTextValue = useWatch({ name });

  const handleConfirm = () => {
    onClose();
    onConfirm?.();
  };

  return (
    <HStack
      bg="gray.100"
      p="4"
      borderRadius="8"
      flex="1"
      justifyContent="space-between"
    >
      {isOpen ? (
        <TextArea name={name} resize="none" noOfLines={1} />
      ) : (
        <Text>{myTextValue}</Text>
      )}
      {isOpen ? (
        <Icon as={BsCheck2} cursor="pointer" onClick={handleConfirm} />
      ) : (
        <Icon as={AiOutlineEdit} cursor="pointer" onClick={onOpen} />
      )}
    </HStack>
  );
};

export default MyLibraryTextItem;
