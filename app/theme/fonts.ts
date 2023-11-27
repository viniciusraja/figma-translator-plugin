import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

const fonts = {
  body: nunito.style.fontFamily,
  heading: nunito.style.fontFamily,
};
export default fonts;
