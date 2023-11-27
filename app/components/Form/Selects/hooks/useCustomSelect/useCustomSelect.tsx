import { useFormContext } from "react-hook-form";
import {
  ActionMeta,
  GroupBase,
  createFilter,
  SelectInstance,
} from "chakra-react-select";
import { useRef } from "react";

import { OptionType, CustomSelectProps } from "../../types";
import useClearSelectInputValueOnForcedClear from "./hooks/useClearSelectInputValueOnForcedClear";
import getComponents from "./utils/getComponents";
import useSelectCustomStyle from "./hooks/useSelectCustomStyle";
import callAllFns from "@/lib/callAllFns";

type UseCustomSelectProps = {
  name: string;
};

type GetCustomSelectProps = CustomSelectProps;

const useCustomSelect = ({ name }: UseCustomSelectProps) => {
  const { watch, resetField, control, register } = useFormContext();

  const {
    onChange: onChangeSelect,
    ref: fieldRef,
    ...selectField
  } = register(name);

  const selectInputRef =
    useRef<SelectInstance<any, boolean, GroupBase<unknown>>>();

  const handleSelectOnchange = (
    option: OptionType,
    event?: ActionMeta<OptionType | unknown>
  ) => {
    if (event?.action === "clear" && option === null && event?.name) {
      resetField(event?.name);
      return;
    }
    if (!option) return;

    onChangeSelect((option as any)?.value);

    /**
     * Clear Input Value after selection so it keeps the input state clean for new searches
     */
    if ((selectInputRef?.current?.props as any)?.inputName)
      resetField((selectInputRef?.current?.props as any)?.inputName, {
        defaultValue: "",
      });
  };

  useClearSelectInputValueOnForcedClear({
    name,
    selectInputRef: selectInputRef as any,
  });

  const { getSelectCustomStyles } = useSelectCustomStyle();

  const getCustomSelectProps = (
    {
      onChange,
      options,
      filterMachFromStart,
      label,
      width = "100%",
      height,
      components,
      ...props
    }: GetCustomSelectProps = {} as any
  ) => {
    const optionsWithoutEmptyValues = options?.filter(
      (option) => !(!option?.value && !option?.label)
    );

    const selectedOption = options?.find((option) => {
      const value = watch(name);

      return option.value === value && !!option.label;
    });
    const filterConfig = createFilter({
      matchFrom: filterMachFromStart ? "start" : "any",
      stringify: (option) => `${option.label}`,
    });

    const defaultValue = control._defaultValues[name];
    const searchSelectComponents = getComponents(components as any);

    return {
      ...selectField,
      onChange: callAllFns(handleSelectOnchange, onChange as any) as any,
      id: name,
      key: `${name}_key`,
      ref: (e: any) => {
        fieldRef(e);
        selectInputRef.current = e;
      },
      label,
      filterOption: filterConfig,
      isClearable: selectedOption?.value !== defaultValue,
      value: selectedOption,
      placeholderTextColor: "red",
      backspaceRemovesValue: true,
      chakraStyles: getSelectCustomStyles({ width, height }),
      options: optionsWithoutEmptyValues,
      ...searchSelectComponents,
      ...props,
    } as const;
  };

  return { getCustomSelectProps };
};

export default useCustomSelect;
