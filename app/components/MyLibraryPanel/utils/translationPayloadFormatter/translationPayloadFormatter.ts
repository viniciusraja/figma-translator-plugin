import { MyTextNode } from "@/lib/getTextForSelection";
import formatTextsSelectionToTranslationObject from "./utils/formatTextsSelectionToTranslationObject";
import removeEmptySpacesInPayloadString from "./utils/removeEmptySpacesInPayloadString";

const translationPayloadFormatter = (textSelections: MyTextNode[]) => {
  const payloadToTranslate = removeEmptySpacesInPayloadString(
    JSON.stringify(formatTextsSelectionToTranslationObject(textSelections))
  );

  return payloadToTranslate;
};

export default translationPayloadFormatter;
