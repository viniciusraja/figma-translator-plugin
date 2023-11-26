import { MyTextNode } from "@/lib/getTextForSelection";

const formatTextsSelectionToTranslationObject = (
  textSelections: MyTextNode[]
) => {
  return textSelections?.reduce((acc, textSelection) => {
    if (!!textSelection?.id)
      return {
        ...acc,
        [textSelection?.id]: textSelection?.text,
      };
    return acc;
  }, {} as MyTextNode);
};

export default formatTextsSelectionToTranslationObject;
