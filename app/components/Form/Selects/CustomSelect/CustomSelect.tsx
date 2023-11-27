import { Select } from "chakra-react-select";
import SelectWrapper from "../SelectWrapper";
import { OptionType, CustomSelectProps } from "../types";
import useCustomSelect from "../hooks/useCustomSelect";

type CustomCustomSelectProps = {} & Omit<CustomSelectProps, "isMulti">;

const CustomSelect = (props: CustomCustomSelectProps) => {
  const { name, onChange } = props;

  const { getCustomSelectProps } = useCustomSelect({
    name,
  });
  const searchSelectProps = getCustomSelectProps({
    ...props,
    onChange: (selectedOption: OptionType) => {
      onChange?.(selectedOption?.value as string);
    },
  }) as any;

  return (
    <SelectWrapper {...props}>
      <Select {...searchSelectProps} />
    </SelectWrapper>
  );
};

export default CustomSelect;
