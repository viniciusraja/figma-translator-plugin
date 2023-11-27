import { VStack, FormControl, Text, FormLabel } from "@chakra-ui/react";
import { get } from "lodash";
import { cloneElement, ReactElement } from "react";
import { useFormContext } from "react-hook-form";
import { CustomSelectProps } from "../types";
import colors from "@/app/theme/colors";

type SelectWrapperProps = { children: ReactElement } & CustomSelectProps;

const SelectWrapper = (props: SelectWrapperProps) => {
  const {
    name,
    options,
    isDisabled,
    children,
    helperText,
    label,
    width = "100%",
    inputName,
  } = props;
  const {
    watch,
    formState: { errors },
  } = useFormContext();

  const fieldError = get(errors, name);
  const formValue = watch(name);

  const selectedOption = options
    ?.filter((obj) => obj.value === formValue)
    ?.find((option) => !!option.label);

  const hasInputNameValue = !!inputName && !!watch(inputName);

  const selectedFormOptionIsFilled = formValue?.length > 0;
  const selectedOptionHasLabel = !!selectedOption?.label;
  const shouldMoveLabel =
    selectedFormOptionIsFilled || selectedOptionHasLabel || hasInputNameValue;

  const primaryTextColor = colors.secondary;

  return (
    <VStack spacing={2} width={width} alignItems="start">
      <FormControl
        display="inline-grid"
        as="label"
        pos="relative"
        alignSelf="center"
        isDisabled={isDisabled}
        _focusWithin={{
          label: {
            transform: "translate(0, 12px) scale(0.9)",
          },
        }}
        isInvalid={!!fieldError}
      >
        {children}
      </FormControl>
      {!!helperText && !fieldError && (
        <Text color="gray.800" pl={4} fontSize="sm">
          {helperText}
        </Text>
      )}
    </VStack>
  );
};

export default SelectWrapper;
