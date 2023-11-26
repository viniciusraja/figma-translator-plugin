const formatTranslationResponse = (translationResponse: any) => {
  try {
    return JSON.parse(translationResponse?.choices?.[0]?.message?.content);
  } catch (err) {
    console.error("The Translation Response was not in the correct format");
  }
};

export default formatTranslationResponse;
