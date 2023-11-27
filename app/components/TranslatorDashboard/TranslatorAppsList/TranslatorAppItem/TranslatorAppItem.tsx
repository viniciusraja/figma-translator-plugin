import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { IoIosArrowForward } from "react-icons/io";

type TranslatorAppItemProps = {
  title: string;
  description: string;
  icon: IconType;
  route: string;
};

const TranslatorAppItem = ({
  title,
  description,
  icon,
}: TranslatorAppItemProps) => {
  return (
    <VStack w="100%" p="8px">
      <HStack
        justifyContent={"start"}
        w="100%"
        p="8px"
        borderRadius={"8px"}
        cursor="pointer"
        _hover={{ backgroundColor: "hover.light" }}
      >
        <VStack
          bg="hover.light"
          w="32px"
          h="32px"
          borderRadius="8px"
          alignItems="center"
          justifyContent={"center"}
        >
          <Icon as={icon} color="primary" />
        </VStack>
        <VStack alignItems={"start"} w="100%" spacing="0">
          <Text fontWeight="bold" fontSize={"md"}>
            {title}
          </Text>
          <Text fontSize="sm">{description}</Text>
        </VStack>
        <Icon as={IoIosArrowForward} color="primary" />
      </HStack>
    </VStack>
  );
};

export default TranslatorAppItem;
