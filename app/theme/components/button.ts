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
      _hover: {
        bg: colors.hover.dark,
      },
    }),
    error: () => ({
      bg: colors.error,
      color: colors.white,
      _hover: {
        bg: colors.hover.light,
      },
    }),
    outline: () => ({
      bg: colors.white,
      color: colors.primary,
      borderWidth: "1px",
      borderColor: colors.primary,
      _hover: {
        bg: colors.hover.dark,
      },
    }),
    outline_dark: () => ({
      bg: colors.white,
      color: colors.text,
      borderWidth: "1px",
      borderColor: colors.gray[400],
      _hover: {
        bg: colors.hover.dark,
      },
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
