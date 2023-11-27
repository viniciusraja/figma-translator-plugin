import { Checkbox } from "@chakra-ui/react";
import {
  chakraComponents,
  OptionProps as ReactSelectOptionProps,
} from "chakra-react-select";

interface OptionProps extends ReactSelectOptionProps {}

const Option = ({
  isSelected,
  label,
  isFocused,
  isMulti,
  isDisabled,
  ...rest
}: OptionProps) => {
  return (
    <chakraComponents.Option
      {...rest}
      isMulti={isMulti}
      isSelected={isSelected}
      label={label}
      isFocused={isFocused}
      isDisabled={isDisabled || isSelected}
    >
      {isMulti ? (
        <Checkbox
          fontWeight="bold"
          isChecked={isSelected}
          data-testid={`checkbox_${label}`}
          mt={-2}
          width="100%"
          ml={-3}
          mb={5}
        >
          {label}
        </Checkbox>
      ) : (
        <>{label}</>
      )}
    </chakraComponents.Option>
  );
};
export default Option;
