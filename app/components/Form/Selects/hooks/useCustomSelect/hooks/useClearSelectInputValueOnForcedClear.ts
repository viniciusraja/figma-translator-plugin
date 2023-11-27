import { GroupBase, SelectInstance } from 'react-select';
import { MutableRefObject, useEffect } from 'react';
import { useWatch } from 'react-hook-form';

type UseClearSelectInputValueOnForcedClearProps = {
  name: string;
  selectInputRef: MutableRefObject<
    SelectInstance<any, boolean, GroupBase<unknown>> | undefined
  >;
};

const useClearSelectInputValueOnForcedClear = ({
  selectInputRef,
  name,
}: UseClearSelectInputValueOnForcedClearProps) => {
  const selectValue = useWatch({ name });

  const selectedOption = selectInputRef?.current?.props?.options?.find(
    option => option.value === selectValue && !!option.label,
  );

  const onClear = () => {
    selectInputRef?.current?.clearValue();
  };

  useEffect(() => {
    /**
     * Short circuit clearing select if there's a valid label value for an empty select value
     * a common case for this is when there's a filter with label='All' and value=""
     */
    if (!!selectedOption?.label && selectValue === '') return;

    if (selectValue === '' || selectValue === undefined) onClear();
  }, [selectValue === '', selectValue === undefined]);
};

export default useClearSelectInputValueOnForcedClear;
