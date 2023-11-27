import { useEffect, useState } from "react";
import { figmaAPI } from "../figmaAPI";

const useFigma = <T extends keyof PluginAPI>(
  property: T
): { figmaContext: PluginAPI[T] } => {
  const [figmaContext, setFigmaContext] = useState<PluginAPI[T]>({} as any);

  useEffect(() => {
    try {
      (async () => {
        const figma = await figmaAPI.run(
          (figma, { property }) => {
            return figma[property];
          },
          { property }
        );
        setFigmaContext(figma);
      })();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return { figmaContext };
};

export default useFigma;
