import { MyTextNode } from "@/lib/getTextForSelection";
import formatTranslationResponse from "./utils/formatTranslationResponse";

const translationResponseFormatter = (
  translationResponse: any,
  originalOrderedTranslationPayload: MyTextNode[]
) => {
  const formattedResponse = formatTranslationResponse(translationResponse);

  const formattedTranslationsResponse = originalOrderedTranslationPayload?.map(
    (orderedPayload, index) => ({
      id: orderedPayload?.id,
      text: formattedResponse[index],
    })
  );

  return formattedTranslationsResponse;
};

export default translationResponseFormatter;
