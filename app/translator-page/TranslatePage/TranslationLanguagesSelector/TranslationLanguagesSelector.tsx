import CustomSelect from "@/app/components/Form/Selects/CustomSelect";
import { HStack, VStack } from "@chakra-ui/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { availableLanguages } from "./availableLanguages";

const TranslationLanguagesSelector = () => {
  const { fields, append, remove } = useFieldArray({
    name: "translate_to_languages",
  });
  const { watch } = useFormContext();

  const lastFieldIndex = fields.length - 1;
  return (
    <VStack w="100%">
      {fields?.map((field, index) => {
        const isLastField = lastFieldIndex === index;
        const isFilled = watch(`translate_to_languages.${index}.language`);
        return (
          <HStack w="100%" key={field?.id}>
            <CustomSelect
              placeholder="Selecione o idioma"
              options={availableLanguages}
              label=""
              name={`translate_to_languages.${index}.language`}
            />
          </HStack>
        );
      })}
    </VStack>
  );
};

export default TranslationLanguagesSelector;
