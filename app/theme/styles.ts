import { StyleOptions } from "./colors";

const styles = {
  global: ({ colorMode }: StyleOptions) => ({
    fontFamily: "Nunito",
    fontWeight: "regular",
    height: "100vh",
  }),
  body: ({ colorMode }: StyleOptions) => ({
    height: "100vh",
  }),
};

export default styles;
