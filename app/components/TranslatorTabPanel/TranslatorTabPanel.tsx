// import { figmaAPI } from "@/lib/figmaAPI";
import { getTextForSelection } from "@/lib/getTextForSelection";
import { getTextOffset } from "@/lib/getTextOffset";
import { Button, HStack, Input, TabPanel, Text } from "@chakra-ui/react";
import { useState } from "react";

const TranslatorTabPanel = () => {
  const [texts, setTexts] = useState<string[]>([]);
  const handleTranslate = async () => {
    const allTexts = await getTextForSelection();
    // const template = await figmaAPI.run((figma) => {
    //   const selection = figma.currentPage.selection;
    //   const frameToDuplicate = selection[0];
    //   const duplicatedFrame = frameToDuplicate.clone();

    //   duplicatedFrame.y += duplicatedFrame.height + 50;
    //   figma.currentPage.appendChild(duplicatedFrame);

    //   return figma.currentPage.clone();
    //   // console.log()
    // });
    const textsPostion = await getTextOffset();
    console.log(allTexts, textsPostion, "       asdasd   asd");
    setTexts(allTexts);
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
