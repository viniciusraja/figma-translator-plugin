const getTranslation = async (
  formattedTextsSelections: string,
  languageToTranslate: string
) => {
  try {
    const response = await fetch("/api/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        textsToTranslate: formattedTextsSelections,
        languageToTranslateTo: languageToTranslate,
      }),
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (err) {
    console.error(err, "response err");
  }
};

export default getTranslation;
