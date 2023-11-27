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
      _hover: {
        borderColor: colors.primary,
      },
      _focus: {
        borderColor: colors.primary,
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: isDisabled ? colors.gray[500] : colors.text,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      backgroundColor: colors.white,
      color: colors.primary,
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
      minH: SELECT_HEIGHT,
      alignItems: "center",
      color: state.isFocused ? "white" : colors.text,
      _selected: {
        backgroundColor: colors.primary,
        opacity: "1",
        color: colors.white,
      },
      backgroundColor: state.isFocused ? colors.hover.dark : colors.white,
    }),

    menuList: (provided) => ({
      ...provided,
      padding: "0px",
      borderRadius: "8px",
      borderWidth: "1px",
      borderColor: colors.hover.dark,
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px",
      marginTop: "8px",
    }),
  });
  return { getSelectCustomStyles };
};

export default useSelectCustomStyle;
