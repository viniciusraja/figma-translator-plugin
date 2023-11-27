import { chakraComponents, DropdownIndicatorProps } from "chakra-react-select";
import { Icon } from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";

type CustomDropdownIndicatorProps = {} & DropdownIndicatorProps;

const DropdownIndicator = ({
  selectProps,
  ...props
}: CustomDropdownIndicatorProps) => {
  return (
    <chakraComponents.DropdownIndicator selectProps={selectProps} {...props}>
      <Icon as={IoIosArrowDown} fontSize="sm" />
    </chakraComponents.DropdownIndicator>
  );
};
export default DropdownIndicator;
