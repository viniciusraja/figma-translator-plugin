import { figmaAPI } from "@/lib/figmaAPI";

export async function getTextForSelection() {
  return await figmaAPI.run((figma) => {
    const { selection } = figma.currentPage;

    const getTextForNode = (node: SceneNode) => {
      if (node.type === "TEXT") {
        return { id: node.id, text: node.characters };
      } else if (node.type === "STICKY" || node.type === "SHAPE_WITH_TEXT") {
        return { id: node.id, text: node.text.characters };
      }
      return null;
    };

    type MyTextNode = { id: string; text: string };
    const layers: MyTextNode[] = [];

    for (const node of selection) {
      if ("findAllWithCriteria" in node) {
        const childText = node
          ?.findAllWithCriteria({
            types: ["TEXT", "STICKY", "SHAPE_WITH_TEXT"],
          })
          ?.map(getTextForNode)
          ?.filter((textNode) => textNode !== null);

        layers.push(childText as any as MyTextNode);
      }
      const text = getTextForNode(node);
      if (text !== null) {
        layers.push(text);
      }
    }

    return layers;
  });
}
