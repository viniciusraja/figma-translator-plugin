import { BsTranslate } from "react-icons/bs";
import TranslatorAppItem from "./TranslatorAppItem";
const translatorAppsList = [
  {
    title: "Tradutor",
    description: "Traduza textos ou frames completos.",
    icon: BsTranslate,
    routeToNavigate: "/translator-page",
  },
];

const TranslatorAppsList = () => {
  return translatorAppsList?.map((translatorApp) => (
    <TranslatorAppItem key={translatorApp.title} {...translatorApp} />
  ));
};

export default TranslatorAppsList;
