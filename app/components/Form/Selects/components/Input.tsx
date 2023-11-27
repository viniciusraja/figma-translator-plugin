import { chakraComponents, InputProps } from "chakra-react-select";
import { useController } from "react-hook-form";

export type CustomInputProps = {} & InputProps;

const Input = ({ onChange, ...props }: CustomInputProps) => {
  const { inputName } = props.selectProps as any;

  const {
    field: { onChange: onchangeField },
  } = useController({
    name: inputName || "",
    defaultValue: "",
  });

  return (
    <chakraComponents.Input
      {...props}
      onChange={(e) => {
        onChange?.(e);
        onchangeField(e);
      }}
      isHidden={false}
    />
  );
};
export default Input;
