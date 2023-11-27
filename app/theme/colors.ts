export interface StyleOptions {
  colorMode: "light" | "dark";
}

const colors = {
  primary: "#8400FF",
  secondary: "#B600FF",
  tertiary: "#DC00FF",
  success: "#81C77B",
  error: "#F18F8F",
  warning: "#EADE76",
  info: "#78CCD8",
  white: "#ffffff",
  text: "#444444",
  gray: {
    500: "#9A9A9A",
    400: "#C7C7C7",
    300: "#E8E8E8",
  },
  hover: { light: "#EFEAF0", dark: "#D2B1F0" },
} as const;

export default colors;
