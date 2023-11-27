import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], weight: ["300", "400", "700"] });

const fonts = {
  fonds: {
    mono: nunito.style.fontFamily,
    body: nunito.style.fontFamily,
    heading: nunito.style.fontFamily,
  },
  fontWeights: {
    light: 300,
    regular: 400,
    bold: 700,
  },
  fontSizes: {
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px",
    "2xl": "20px",
    "3xl": "24px",
    "4xl": "38px",
    "5xl": "36px",
    "6xl": "48px",
  },
};
export default fonts;
