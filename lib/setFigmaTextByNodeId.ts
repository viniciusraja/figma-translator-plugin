import { figmaAPI } from "./figmaAPI";

const setFigmaTextByNodeId = async (nodeId: string, newText: string) => {
  await figmaAPI.run(
    async (figma, { nodeId, newText }) => {
      // Find the node by ID
      const node = figma.getNodeById(nodeId);

      // Check if the node exists and is a text layer
      if (node && node.type === "TEXT") {
        // Load all text fonts before replacing
        await figma.loadFontAsync((node as any)?.fontName);

        // Update the text of the text layer
        const textNode = node as TextNode;

        textNode.characters = newText || textNode.characters;
      } else if (
        (node && node.type === "STICKY") ||
        (node && node.type === "SHAPE_WITH_TEXT")
      ) {
        // Update the text of the text layer
        node.text.characters = newText || node.text.characters;
      } else {
        console.error("Node not found or is not a text layer.");
      }
    },
    { nodeId, newText }
  );
};

export default setFigmaTextByNodeId;
