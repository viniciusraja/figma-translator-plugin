"use client";

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import useFigma from "@/lib/hooks/useFigma";
import CustomBreadCrumb from "./CustomBreadCrumb";

const Header = () => {
  const { figmaContext } = useFigma("currentUser");

  return (
    <VStack w="100%" spacing="0" py="8px" alignItems={"start"}>
      <VStack p="0" px="8px" w="100%">
        <HStack
          alignItems="center"
          w="100%"
          bg="hover.light"
          borderRadius="8px"
          p="8px"
          borderBottomRadius="0px"
        >
          <Text fontWeight="bold" fontSize={"md"}>
            {figmaContext?.name}
          </Text>
        </HStack>
      </VStack>
      <Box
        borderBottomWidth="1px"
        borderBottomColor="primary"
        w="100%"
        p="0"
        m="0"
      />
      <Box p="8px">
        <CustomBreadCrumb />
      </Box>
    </VStack>
  );
};

export default Header;
