import { getTextForSelection } from "@/lib/getTextForSelection";
import setFigmaTextByNodeId from "@/lib/setFigmaTextByNodeId";
import {
  Button,
  CircularProgress,
  HStack,
  Input,
  TabPanel,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { useState } from "react";
import translationPayloadFormatter from "../MyLibraryPanel/utils/translationPayloadFormatter/translationPayloadFormatter";
import translationResponseFormatter from "../MyLibraryPanel/utils/translationResponseFormatter.ts/translationResponseFormatter";

const TranslatorTabPanel = () => {
  const [texts, setTexts] = useState<string[]>([]);
  const [isLoading, { on: setIsLoadingOn, off: setIsLoadingOff }] =
    useBoolean();

  const handleTranslate = async () => {
    setIsLoadingOn();
    const allTexts = await getTextForSelection();

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

      formattedTranslationsResponse?.forEach(
        async (translationNode) =>
          await setFigmaTextByNodeId(translationNode?.id, translationNode?.text)
      );
    } catch (err) {
      console.log(err, "response err");
    }
    setIsLoadingOff();
  };

  return (
    <TabPanel p="4">
      {texts?.map((text) => (
        <HStack p="2">
          <Text minW="30%">{text}</Text>
          <Input name="template_text" defaultValue={text} />
        </HStack>
      ))}
      {isLoading ? (
        <CircularProgress isIndeterminate />
      ) : (
        <Button onClick={handleTranslate}>Translate</Button>
      )}
    </TabPanel>
  );
};

export default TranslatorTabPanel;
