import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], weight: ["300", "400", "700"] });

const fonts = {
  body: nunito.style.fontFamily,
  heading: nunito.style.fontFamily,
};
export default fonts;
