import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import useFigma from "@/lib/hooks/useFigma";

const Header = () => {
  const { figmaContext } = useFigma("currentUser");
  console.log(figmaContext);

  return (
    <Box w="100%" borderBottomWidth="1px" borderBottomColor="primary" px="8px">
      <HStack
        alignItems="center"
        w="100%"
        bg="hover.light"
        borderRadius="8px"
        p="8px"
        borderBottomRadius="0px"
      >
        <Text fontWeight="bold">{figmaContext?.name}</Text>
      </HStack>
    </Box>
  );
};

export default Header;
