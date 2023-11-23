// import { figmaAPI } from "@/lib/figmaAPI";
import { figmaAPI } from "@/lib/figmaAPI";
import { getTextForSelection } from "@/lib/getTextForSelection";
import { getTextOffset } from "@/lib/getTextOffset";
import replaceSelectedTexts from "@/lib/utils/replaceSelectedTexts";
import { Button, HStack, Input, TabPanel, Text } from "@chakra-ui/react";
import { useState } from "react";

const TranslatorTabPanel = () => {
  const [texts, setTexts] = useState<string[]>([]);

  const response = {
    id: "chatcmpl-8O3SFEB0tldnjffAoAmhOhM9C0yaR",
    object: "chat.completion",
    created: 1700743843,
    model: "gpt-3.5-turbo-0613",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content:
            "Qualified with Reservations\nUnfit\nAlert Center\nFit\nEnvironmental Analysis",
        },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 71,
      completion_tokens: 15,
      total_tokens: 86,
    },
  };
  const handleTranslate = async () => {
    // const allTexts = await getTextForSelection();
    // This function calls our API and lets you read each character as it comes in.
    // To change the prompt of our AI, go to `app/api/completion.ts`.
    // try {
    //   const resp = await fetch("/api/completion", {
    //     method: "POST",
    //     headers: {
    //       // "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(allTexts),
    //   });
    //   console.log(resp, "  reeeesssssppp----------------");
    //   // console.log(await resp.json());
    // } catch (err) {
    //   console.log(err, "response err");
    // }
    const getResponseAsArray =
      response?.choices?.[0]?.message?.content.split("\n");

    try {
      await replaceSelectedTexts(getResponseAsArray);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TabPanel p="4">
      {texts?.map((text) => (
        <HStack p="2">
          <Text minW="30%">{text}</Text>
          <Input name="template_text" defaultValue={text} />
        </HStack>
      ))}
      <Button onClick={handleTranslate}>Translate</Button>
    </TabPanel>
  );
};

export default TranslatorTabPanel;
