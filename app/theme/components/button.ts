import { ComponentStyleConfig } from "@chakra-ui/react";
import colors from "../colors";

const Button: ComponentStyleConfig = {
  sizes: {
    md: {
      p: "8px",
    },
  },
  variants: {
    solid: () => ({
      bg: colors.primary,
      color: colors.white,
    }),
    outline: () => ({
      bg: colors.white,
      color: colors.primary,
      borderWidth: "1px",
      borderColor: colors.primary,
    }),
  },

  baseStyle: {
    borderRadius: "8px",
    _disabled: {
      bg: colors.gray["300"],
      color: colors.gray[500],
    },
    _loading: {
      bg: colors.hover.dark,
    },
    fontWeight: "regular",
  },
  defaultProps: {
    variant: "solid",
  },
};

export default Button;
