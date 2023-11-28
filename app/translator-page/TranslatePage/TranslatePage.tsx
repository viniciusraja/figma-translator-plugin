import { Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import TranslationLanguagesSelector from "./TranslationLanguagesSelector";
import { FormProvider, useForm } from "react-hook-form";
import { LuRefreshCw } from "react-icons/lu";
import { BsFullscreen } from "react-icons/bs";
import { FaSheetPlastic } from "react-icons/fa6";

const translateFormDefaults = {
  translate_to_languages: [{ language: "" }],
};

const TranslatePage = () => {
  const selectedTexts = 0;

  const form = useForm({ defaultValues: translateFormDefaults });

  return (
    <FormProvider {...form}>
      <VStack
        p="8px"
        w="100%"
        flex="1"
        alignItems="start"
        justifyContent="space-between"
      >
        <VStack alignItems="start" w="100%">
          <Text fontSize="md">
            Selecione o(s) frame(s) que deseja traduzir:
          </Text>
          <HStack
            bg="hover.light"
            w="100%"
            borderRadius="8px"
            p="8px"
            justifyContent="center"
          >
            <Text fontSize="md" color="primary" fontWeight={"bold"}>
              {selectedTexts}
            </Text>
            <Text fontSize="md">palavra(s) selecionada(s)</Text>
          </HStack>

          <Text fontWeight="bold" fontSize="md">
            Traduzir Para:
          </Text>

          <HStack w="100%">
            <TranslationLanguagesSelector />
          </HStack>
          <Text fontWeight="bold" fontSize="md">
            Resultados:
          </Text>

          <Button
            w="100%"
            variant="outline_dark"
            justifyContent="start"
            leftIcon={<Icon as={LuRefreshCw} />}
          >
            Substituir texto fonte
          </Button>
          <Button
            justifyContent="start"
            w="100%"
            variant="outline_dark"
            leftIcon={<Icon as={BsFullscreen} />}
          >
            Criar em outro frame
          </Button>
          <Button
            justifyContent="start"
            w="100%"
            variant="outline_dark"
            leftIcon={<Icon as={FaSheetPlastic} />}
          >
            Criar em outra página
          </Button>
        </VStack>
        <Button w="100%">Traduzir</Button>
      </VStack>
    </FormProvider>
  );
};

export default TranslatePage;
