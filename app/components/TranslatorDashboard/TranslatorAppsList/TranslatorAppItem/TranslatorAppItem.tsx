import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { IoIosArrowForward } from "react-icons/io";

type TranslatorAppItemProps = {
  title: string;
  description: string;
  icon: IconType;
  routeToNavigate: string;
};

const TranslatorAppItem = ({
  title,
  description,
  icon,
  routeToNavigate,
}: TranslatorAppItemProps) => {
  const route = useRouter?.();

  return (
    <VStack w="100%" p="8px">
      <HStack
        justifyContent={"start"}
        w="100%"
        p="8px"
        borderRadius={"8px"}
        cursor="pointer"
        onClick={() => route?.push(routeToNavigate)}
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
