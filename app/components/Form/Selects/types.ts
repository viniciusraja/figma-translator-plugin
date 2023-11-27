import { FieldError } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { Props as SelectProps, InputActionMeta } from "chakra-react-select";
import { ExecuteAllFn } from "@/lib/callAllFns";

export type OptionType = {
  value: string | null;
  label: string | never;
};

export interface CustomSelectProps extends Omit<SelectProps, "onChange"> {
  options: OptionType[];
  name: string;
  label: string;
  height?: string;
  width?: string;
  error?: FieldError;
  helperText?: string;
  inputName?: string;
  isClearable?: boolean;
  disableAutoComplete?: boolean;
  onInputChange?:
    | Dispatch<SetStateAction<string>>
    | ((value: string, action?: InputActionMeta) => void);
  filterMachFromStart?: boolean;
  onChange?: ((selectedValue: string) => void) | ExecuteAllFn<any[]>;
  isDisabled?: boolean;
  onClear?: () => void;
  isLoading?: boolean;
  disabledTooltipLabel?: string;
}
