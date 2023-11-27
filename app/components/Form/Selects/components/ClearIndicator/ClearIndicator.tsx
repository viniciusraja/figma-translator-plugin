import { chakraComponents, ClearIndicatorProps } from "chakra-react-select";
import { useFormContext } from "react-hook-form";
import { MouseEvent } from "react";

const ClearIndicator = ({
  selectProps,
  innerProps: { onMouseDown, ...innerProps },
  ...props
}: ClearIndicatorProps) => {
  const { resetField } = useFormContext();

  const handleClear = (e: MouseEvent<HTMLDivElement>) => {
    onMouseDown?.(e);

    // Call custom onClear function if exists
    (selectProps as any)?.onClear?.();

    if ((selectProps as any)?.inputName) {
      resetField((selectProps as any)?.inputName);
    }
  };
  return (
    <chakraComponents.ClearIndicator
      {...{ selectProps, ...props }}
      innerProps={
        {
          ...innerProps,
          onMouseDown: handleClear,
          "data-testid": `clear_indicator_${selectProps?.name}`,
        } as any
      }
    />
  );
};

export default ClearIndicator;
