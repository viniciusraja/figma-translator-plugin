import CustomSelect from "@/app/components/Form/Selects/CustomSelect";
import { Button, HStack, Icon, VStack } from "@chakra-ui/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";

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
              options={[
                { value: "english", label: "Inglês" },
                { value: "portuguese", label: "Português" },
              ]}
              label=""
              name={`translate_to_languages.${index}.language`}
            />
            {isLastField ? (
              <Button onClick={append} isDisabled={!isFilled}>
                <Icon as={FaCirclePlus} color="white" />
              </Button>
            ) : (
              <Button variant="error" onClick={() => remove(index)}>
                <Icon as={FaCircleMinus} color="white" />
              </Button>
            )}
          </HStack>
        );
      })}
    </VStack>
  );
};

export default TranslationLanguagesSelector;
