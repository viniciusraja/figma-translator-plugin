import { figmaAPI } from "../figmaAPI";

export default async function replaceSelectedTexts(
  textToReplaceList: string[]
) {
  return await figmaAPI.run(
    async (figma, { textsToReplace }) => {
      const { selection } = figma.currentPage;

      const replaceTextNode = async (
        textToReplace: string,
        node: SceneNode
      ) => {
        // Load all text fonts before replacing
        await figma.loadFontAsync((node as any)?.fontName);

        if (node.type === "TEXT") {
          return (node.characters = textToReplace || node.characters);
        } else if (node.type === "STICKY" || node.type === "SHAPE_WITH_TEXT") {
          return (node.text.characters = textToReplace || node.text.characters);
        }
        return null;
      };

      for (const node of selection) {
        console.log(node?.type);
        if (node?.type !== "FRAME")
          return figma.notify("Please select a frame to duplicate.");

        const clonedNode = node?.clone();

        if ("findAllWithCriteria" in clonedNode) {
          clonedNode
            ?.findAllWithCriteria({
              types: ["TEXT", "STICKY", "SHAPE_WITH_TEXT"],
            })
            .forEach(async (node, index) => {
              return replaceTextNode(textsToReplace[index], node);
            });
        }

        //Position Node Right bellow current one
        clonedNode.y += clonedNode.height + 50;

        //Add node to current page
        figma.currentPage.appendChild(clonedNode);
      }
      figma.notify("Created Translations");
    },
    { textsToReplace: textToReplaceList }
  );
}
