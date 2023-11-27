/* eslint-disable @typescript-eslint/no-unused-vars */
import * as ReactSelect from "chakra-react-select";

declare module "chakra-react-select/dist/types/select" {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends ReactSelect.GroupBase<Option>,
  > {
    inputName?: string;
    onClear?: () => void;
  }
}
