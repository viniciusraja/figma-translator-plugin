import { GroupBase } from "chakra-react-select";
import Input from "@/app/components/Form/Selects/components/Input";
import Option from "@/app/components/Form/Selects/components/Option";
import DropdownIndicator from "@/app/components/Form/Selects/components/DropdownIndicator";
import ClearIndicator from "@/app/components/Form/Selects/components/ClearIndicator";

import { SelectComponents } from "react-select/dist/declarations/src/components";

type CustomSelectComponents = Partial<
  SelectComponents<unknown, boolean, GroupBase<unknown>>
>;

type GetComponentsProps = {} & CustomSelectComponents;

type GetComponentsResult = {
  components: CustomSelectComponents;
};

const getComponents = (
  getComponentsProps: GetComponentsProps = {}
): GetComponentsResult => ({
  components: {
    Input,
    DropdownIndicator,
    Option,
    ClearIndicator,
    ...getComponentsProps,
  } as any,
});

export default getComponents;
