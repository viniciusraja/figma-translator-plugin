import {
  Textarea,
  TextareaProps as ChakraTextareaProps,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type TextAreaProps = {
  name: string;
} & ChakraTextareaProps;

const TextArea = ({ name, ...props }: TextAreaProps) => {
  const { register } = useFormContext();
  return <Textarea {...props} {...register(name)} />;
};

export default TextArea;
