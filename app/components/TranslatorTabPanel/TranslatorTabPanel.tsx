import { getTextForSelection } from "@/lib/getTextForSelection";
import setFigmaTextByNodeId from "@/lib/setFigmaTextByNodeId";
import { Button, TabPanel, useBoolean } from "@chakra-ui/react";
import translationPayloadFormatter from "../MyLibraryPanel/utils/translationPayloadFormatter/translationPayloadFormatter";
import translationResponseFormatter from "../MyLibraryPanel/utils/translationResponseFormatter.ts/translationResponseFormatter";
import CustomSelect from "../Form/Selects/CustomSelect";
import { FormProvider, useForm } from "react-hook-form";

const TranslatorTabPanel = () => {
  const [isLoading, { on: setIsLoadingOn, off: setIsLoadingOff }] =
    useBoolean();

  const handleTranslate = async () => {
    setIsLoadingOn();
    const allTexts = await getTextForSelection();
    if (!allTexts) return;
    const formattedTextsSelections = translationPayloadFormatter(allTexts);

    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedTextsSelections),
      });
      const jsonResponse = await response.json();

      const formattedTranslationsResponse = translationResponseFormatter(
        jsonResponse,
        allTexts
      );

      formattedTranslationsResponse?.forEach(async (translationNode) => {
        await setFigmaTextByNodeId(translationNode?.id, translationNode?.text);
      });
    } catch (err) {
      console.error(err, "response err");
    }
    setIsLoadingOff();
  };

  const form = useForm();

  return (
    <FormProvider {...form}>
      <TabPanel p="4">
        <Button isLoading={isLoading} onClick={handleTranslate}>
          Translate
        </Button>
        <CustomSelect
          name="select 1"
          placeholder="Selecione o idioma"
          label="label"
          options={[
            { value: "1", label: "1" },
            { value: "asdasd", label: "1ajksdon" },
            { value: "1dd", label: "asdasd1" },
            { value: "1aaa", label: "asdas asdasd1" },
          ]}
        />
      </TabPanel>
    </FormProvider>
  );
};

export default TranslatorTabPanel;
