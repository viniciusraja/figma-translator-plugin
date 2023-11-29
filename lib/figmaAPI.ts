"use client";

/**
 * This is a magic file that allows us to run code in the Figma plugin context
 * from the iframe. It does this by getting the code as a string, and sending it
 * to the plugin via postMessage. The plugin then evals the code and sends the
 * result back to the iframe. There are a few caveats:
 * 1. The code cannot reference any variables outside of the function. This is
 *   because the code is stringified and sent to the plugin, and the plugin
 *   evals it. The plugin has no access to the variables in the iframe.
 * 2. The return value of the function must be JSON serializable. This is
 *    because the result is sent back to the iframe via postMessage, which only
 *    supports JSON.
 *
 * You can get around these limitations by passing in the variables you need
 * as parameters to the function.
 *
 * @example
 * ```ts
 * const result = await figmaAPI.run((figma, {nodeId}) => {
 *   return figma.getNodeById(nodeId)?.name;
 * }, {nodeId: "0:2"});
 *
 * console.log(result); // "Page 1"
 * ```
 */
class FigmaAPI {
  private id = 0;

  /**
   * Run a function in the Figma plugin context. The function cannot reference
   * any variables outside of itself, and the return value must be JSON
   * serializable. If you need to pass in variables, you can do so by passing
   * them as the second parameter.
   */
  run<T, U>(
    fn: (figma: PluginAPI, params: U) => Promise<T> | T,
    params?: U
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      console.log("entoru em figma api run 1");

      const id = this.id++;
      const cb = (event: MessageEvent) => {
        console.log("entoru em figma api run 2");
        if (
          event.origin !== "http://www.figma.com" &&
          event.origin !== "http://staging.figma.com"
        ) {
          console.log("entoru em figma api run 3");
          return;
        }

        console.log("entoru em figma api run 4");
        if (event.data.pluginMessage?.type === "EVAL_RESULT") {
          console.log("entoru em figma api run 5");
          if (event.data.pluginMessage.id === id) {
            console.log("entoru em figma api run 6");
            window?.removeEventListener("message", cb);
            resolve(event.data.pluginMessage.result);
          }
        }

        if (event.data.pluginMessage?.type === "EVAL_REJECT") {
          console.log("entoru em figma api run 7");
          if (event.data.pluginMessage.id === id) {
            console.log("entoru em figma api run 8");
            window?.removeEventListener("message", cb);
            const message = event.data.pluginMessage.error;
            reject(
              new Error(
                typeof message === "string"
                  ? message
                  : "An error occurred in FigmaAPI.run()"
              )
            );
          }
        }
      };
      console.log(window, " window");
      window?.addEventListener("message", cb);
      console.log("entoru em figma api run 9");

      const msg = {
        pluginMessage: {
          type: "EVAL",
          code: fn.toString(),
          id,
          params,
        },
        pluginId: "*",
      };

      ["http://www.figma.com", "http://staging.figma.com"].forEach((origin) => {
        try {
          console.log("entrou aqui", origin, msg);

          parent.postMessage(msg, origin);
        } catch {}
      });
    });
  }
}

export const figmaAPI = new FigmaAPI();
