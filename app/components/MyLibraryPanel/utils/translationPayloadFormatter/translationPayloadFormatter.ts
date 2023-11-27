import { MyTextNode } from "@/lib/getTextForSelection";
import removeEmptySpacesInPayloadString from "./utils/removeEmptySpacesInPayloadString";

const translationPayloadFormatter = (textSelections: MyTextNode[]) => {
  const payloadToTranslate = removeEmptySpacesInPayloadString(
    JSON.stringify(textSelections.map((textSelection) => textSelection?.text))
  );

  return payloadToTranslate;
};

export default translationPayloadFormatter;
