import colors from "@/app/theme/colors";
import { useTheme } from "@chakra-ui/react";
import { Props as SelectProps } from "chakra-react-select";

export interface UseSelectCustomStyleProps {
  height?: string;
  width?: string;
  keepPlaceholderAfterTyping?: boolean;
  isDisabled?: boolean;
  hasError?: boolean;
  controlFlex?: boolean;
  clearIndicatorTop?: string;
}

const SELECT_HEIGHT = "35px";

const useSelectCustomStyle = () => {
  const getSelectCustomStyles = ({
    height = SELECT_HEIGHT,
    isDisabled = false,
    clearIndicatorTop = "0",
  }: UseSelectCustomStyleProps = {}): SelectProps["chakraStyles"] => ({
    control: (provided) => ({
      ...provided,
      minHeight: height,
      width: "100%",
      borderRadius: "8px",
      borderColor: colors.hover.dark,
      backgroundColor: colors.white,
      display: "flex",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: isDisabled ? colors.gray[500] : colors.text,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      backgroundColor: colors.white,
      color:colors.primary
    }),
    container: (provided) => ({
      ...provided,
      width: "100%",
      height: "100%",
    }),
    valueContainer: (provided) => ({
      ...provided,
      lineHeight: "14px",
    }),
    singleValue: (provided) => ({
      ...provided,
      top: "",
      marginLeft: "0px",
      paddingBottom: "2px",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: 0,
      color: "gray.800",
      fontSize: "8px",
      position: "relative",
      "&:hover": {
        bg: "transparent",
        color: "brand.error.light",
      },
      top: clearIndicatorTop,
    }),

    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      minH: "45px",
      backgroundColor: state.isFocused ? colors.secondary : colors.white,
      alignItems: "center",
      color: state.isFocused ? "white" : colors.text,
    }),
    menu: (provided) => ({
      ...provided,
      margin: "0px",
      borderWidth: "1px",
    }),
  });
  return { getSelectCustomStyles };
};

export default useSelectCustomStyle;
