import { BsTranslate } from "react-icons/bs";
import TranslatorAppItem from "./TranslatorAppItem";
const translatorAppsList = [
  {
    title: "Tradutor",
    description: "Traduza textos ou frames completos.",
    icon: BsTranslate,
    route: "",
  },
];

const TranslatorAppsList = () => {
  return translatorAppsList?.map((translatorApp) => (
    <TranslatorAppItem {...translatorApp} />
  ));
};

export default TranslatorAppsList;
