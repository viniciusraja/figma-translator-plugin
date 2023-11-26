import { MyTextNode } from "@/lib/getTextForSelection";

const formatTextsSelectionToTranslationObject = (
  textSelections: MyTextNode[]
) => {
  return textSelections?.reduce((acc, textSelection, index) => {
    if (!!textSelection?.id)
      return {
        ...acc,
        [index]: textSelection?.text,
      };
    return acc;
  }, {} as MyTextNode);
};

export default formatTextsSelectionToTranslationObject;
