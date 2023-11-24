import { figmaAPI } from "@/lib/figmaAPI";

const saveTranslationToMyLibrary = async (
  originalTextProp: string = "",
  customTranslationTextProp: string = ""
) => {
  try {
    await figmaAPI.run(
      async (figma, { originalText, customTranslationText }) => {
        const itemToSaveToLibrary = { [originalText]: customTranslationText };
        const myLibrary = await figma.clientStorage.getAsync("my_library");

        if (!itemToSaveToLibrary) return;
        await figma.clientStorage.setAsync("my_library", {
          ...myLibrary,
          ...itemToSaveToLibrary,
        });
      },
      {
        originalText: originalTextProp,
        customTranslationText: customTranslationTextProp,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export default saveTranslationToMyLibrary;
