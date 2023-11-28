import CustomSelect from "@/app/components/Form/Selects/CustomSelect";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import TranslationLanguagesSelector from "./TranslationLanguagesSelector";
import { FormProvider, useForm } from "react-hook-form";

const translateFormDefaults = {
  translate_to_languages: [{ language: "" }],
};

const TranslatePage = () => {
  const selectedTexts = 0;

  const form = useForm({ defaultValues: translateFormDefaults });

  return (
    <FormProvider {...form}>
      <VStack p="8px" w="100%" alignItems="start">
        <Text>Selecione o(s) frame(s) que deseja traduzir:</Text>
        <HStack
          bg="hover.light"
          w="100%"
          borderRadius="8px"
          p="8px"
          justifyContent="center"
        >
          <Text color="primary" fontWeight={"bold"}>
            {selectedTexts}
          </Text>
          <Text>palavra(s) selecionada(s)</Text>
        </HStack>

        <Text fontWeight="bold">Traduzir Para:</Text>

        <HStack w="100%">
          <TranslationLanguagesSelector />
        </HStack>
      </VStack>
    </FormProvider>
  );
};

export default TranslatePage;
