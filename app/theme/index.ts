import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import colors from "./colors";
import fonts from "./fonts";
import styles from "./styles";
import Button from "./components/button";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const overrides = {
  colors,
  fonts,
  styles,
  components: {
    Button,
  },
};
const theme = extendTheme({ config, ...overrides });

export default theme;
