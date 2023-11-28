import {
  Button,
  HStack,
  Icon,
  Text,
  VStack,
  useBoolean,
} from "@chakra-ui/react";
import TranslationLanguagesSelector from "./TranslationLanguagesSelector";
import { FormProvider, useForm } from "react-hook-form";
import {
  LuArrowLeftToLine,
  LuArrowRightToLine,
  LuArrowUpToLine,
  LuRefreshCw,
} from "react-icons/lu";
import { BsFullscreen } from "react-icons/bs";
import { FaSheetPlastic } from "react-icons/fa6";
import setFigmaTextByNodeId from "@/lib/setFigmaTextByNodeId";
import translationResponseFormatter from "@/app/components/MyLibraryPanel/utils/translationResponseFormatter.ts/translationResponseFormatter";
import translationPayloadFormatter from "@/app/components/MyLibraryPanel/utils/translationPayloadFormatter/translationPayloadFormatter";
import { getTextForSelection } from "@/lib/getTextForSelection";
import getTranslation from "@/lib/api/getTranslation";
import { useState } from "react";
import { figmaAPI } from "@/lib/figmaAPI";
import { IconType } from "react-icons";
import { LuArrowDownToLine } from "react-icons/lu";

const translateFormDefaults = {
  translate_to_languages: [{ language: "" }],
};

type TranslationReplacementMethod =
  | "replace_original"
  | "create_new_frame"
  | "create_in_new_page"
  | "";

type FrameReplacementAction = {
  title:
    | "Substituir texto fonte"
    | "Criar em outro frame"
    | "Criar em outra página";
  replacementMethod: TranslationReplacementMethod;
  icon: IconType;
  showReplacementPosition?: boolean;
};
const frameReplacementActions: FrameReplacementAction[] = [
  {
    title: "Substituir texto fonte",
    replacementMethod: "replace_original",
    icon: LuRefreshCw,
  },
  {
    title: "Criar em outro frame",
    replacementMethod: "create_new_frame",
    icon: BsFullscreen,
    showReplacementPosition: true,
  },
  {
    title: "Criar em outra página",
    replacementMethod: "create_in_new_page",
    icon: FaSheetPlastic,
  },
];
type TranslationReplacementPosition = "top" | "bottom" | "left" | "right" | "";

type FrameReplacementPosition = {
  replacementPosition: TranslationReplacementPosition;
  icon: IconType;
};
const frameReplacementPositions: FrameReplacementPosition[] = [
  {
    replacementPosition: "bottom",
    icon: LuArrowDownToLine,
  },
  {
    replacementPosition: "top",
    icon: LuArrowUpToLine,
  },
  {
    replacementPosition: "left",
    icon: LuArrowLeftToLine,
  },
  {
    replacementPosition: "right",
    icon: LuArrowRightToLine,
  },
];

const TranslatePage = () => {
  const { watch, ...form } = useForm({ defaultValues: translateFormDefaults });
  const [activeTranslationReplaceMethod, setActiveTranslationReplaceMethod] =
    useState<TranslationReplacementMethod>("");
  const [
    activeTranslationReplacePosition,
    setActiveTranslationReplacePosition,
  ] = useState<TranslationReplacementPosition>("");

  const [isLoading, { on: setIsLoadingOn, off: setIsLoadingOff }] =
    useBoolean();

  const handleTranslationResults = async () => {
    if (activeTranslationReplaceMethod === "replace_original") return;

    return await figmaAPI.run(
      (
        figma,
        { activeTranslationReplaceMethod, activeTranslationReplacePosition }
      ) => {
        const positionFrame = (
          frameToReplace: FrameNode,
          replacePosition: TranslationReplacementPosition
        ) => {
          const replaceOffset = 50;
          if (replacePosition === "bottom") {
            frameToReplace.y =
              frameToReplace.y + frameToReplace.height + replaceOffset;
          }
          if (replacePosition === "top") {
            frameToReplace.y =
              frameToReplace.y - frameToReplace.height - replaceOffset;
          }
          if (replacePosition === "left") {
            frameToReplace.x =
              frameToReplace.x - frameToReplace.width - replaceOffset;
          }
          if (replacePosition === "right") {
            frameToReplace.x =
              frameToReplace.x + frameToReplace.width + replaceOffset;
          }
        };

        let newSelection = [];
        const { selection } = figma.currentPage;
        if (activeTranslationReplaceMethod === "create_new_frame") {
          for (const node of selection) {
            if (node?.type === "FRAME") {
              const clonedFrame = node?.clone();

              positionFrame(clonedFrame, activeTranslationReplacePosition);

              figma.currentPage.appendChild(clonedFrame);
              newSelection.push(clonedFrame);
            }
          }
          figma.currentPage.selection = newSelection;
        }
        if (activeTranslationReplaceMethod === "create_in_new_page") {
          const newPage = figma.createPage();

          for (const node of selection) {
            if (node?.type === "FRAME") {
              const clonedFrame = node?.clone();

              positionFrame(clonedFrame, activeTranslationReplacePosition);

              newPage.appendChild(clonedFrame);

              newSelection.push(clonedFrame);
            }
          }
          figma.currentPage = newPage;

          figma.currentPage.selection = newSelection;
        }
      },
      { activeTranslationReplaceMethod, activeTranslationReplacePosition }
    );
  };

  const handleTranslate = async () => {
    setIsLoadingOn();

    await handleTranslationResults();

    const allTexts = await getTextForSelection();
    if (!allTexts) return;
    const formattedTextsSelections = translationPayloadFormatter(allTexts);
    const languagesToTranslate = watch("translate_to_languages")
      ?.map((language) => language?.language)
      ?.join(",");

    try {
      const jsonResponse = await getTranslation(
        formattedTextsSelections,
        languagesToTranslate
      );

      const formattedTranslationsResponse = translationResponseFormatter(
        jsonResponse,
        allTexts
      );

      formattedTranslationsResponse?.forEach(async (translationNode) => {
        await setFigmaTextByNodeId(translationNode?.id, translationNode?.text);
      });
    } catch (err) {
      console.error(err, "response error");
    }
    setIsLoadingOff();
  };

  return (
    <FormProvider {...{ watch, ...form }}>
      <VStack
        p="8px"
        w="100%"
        h="100%"
        alignItems="start"
        justifyContent="space-between"
      >
        <VStack alignItems="start" w="100%">
          <Text fontSize="md">
            Selecione o(s) frame(s) que deseja traduzir:
          </Text>
          //TODO implement counting on select event
          {/* <HStack
            bg="hover.light"
            w="100%"
            borderRadius="8px"
            p="8px"
            justifyContent="center"
          >
            <Text fontSize="md" color="primary" fontWeight={"bold"}>
              {selectedTexts}
            </Text>
            <Text fontSize="md">palavra(s) selecionada(s)</Text>
          </HStack> */}
          <Text fontWeight="bold" fontSize="md">
            Traduzir Para:
          </Text>
          <HStack w="100%">
            <TranslationLanguagesSelector />
          </HStack>
          <Text fontWeight="bold" fontSize="md">
            Resultados:
          </Text>
          {frameReplacementActions?.map((replacementAction) => (
            <VStack w="100%" key={replacementAction?.replacementMethod}>
              <Button
                w="100%"
                variant="outline_dark"
                justifyContent="start"
                bg={
                  activeTranslationReplaceMethod ===
                  replacementAction?.replacementMethod
                    ? "hover.light"
                    : "white"
                }
                onClick={() =>
                  setActiveTranslationReplaceMethod(
                    replacementAction?.replacementMethod
                  )
                }
                leftIcon={<Icon as={replacementAction?.icon} />}
              >
                {replacementAction?.title}
              </Button>

              {replacementAction?.showReplacementPosition && (
                <HStack>
                  <Text fontSize="md">Localização:</Text>
                  {frameReplacementPositions?.map(
                    (frameReplacementPosition) => (
                      <Button
                        variant="outline_dark"
                        bg={
                          activeTranslationReplacePosition ===
                          frameReplacementPosition?.replacementPosition
                            ? "hover.light"
                            : "white"
                        }
                        key={frameReplacementPosition?.replacementPosition}
                        onClick={() =>
                          setActiveTranslationReplacePosition(
                            frameReplacementPosition?.replacementPosition
                          )
                        }
                      >
                        <Icon as={frameReplacementPosition.icon} />
                      </Button>
                    )
                  )}
                </HStack>
              )}
            </VStack>
          ))}
        </VStack>
        <Button w="100%" isLoading={isLoading} onClick={handleTranslate}>
          Traduzir
        </Button>
      </VStack>
    </FormProvider>
  );
};

export default TranslatePage;
