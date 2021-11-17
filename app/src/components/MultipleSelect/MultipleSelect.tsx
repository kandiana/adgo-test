import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import { RequestFormType } from '../../store/store.types';

import { OptionType, Select } from '../Select/Select';

import './MultipleSelect.css';

export type MultipleSelectProps = {
  options: OptionType[];
  name: keyof RequestFormType;
  setForm: Dispatch<SetStateAction<RequestFormType>>;
  groupBy: string;
  platforms?: number[];
};

export type InputValue = number[];
const INITIAL_INPUT_VALUE: InputValue = [];

export const MultipleSelect: FC<MultipleSelectProps> = ({
  options,
  name,
  setForm,
  groupBy,
  platforms,
}) => {
  const [hidden, setHidden] = useState(true);
  const [value, setValue] = useState(INITIAL_INPUT_VALUE);
  const disabled = `${groupBy}s` === name;
  const [clear, setClear] = useState(false);

  const buttonClasses = classNames('MultipleSelect__button', { hidden: value.length === 0 });

  const handleFocus = (event: any) => {
    setHidden(false);
  };

  const handleBlur = useCallback(() => {
    setHidden(true);
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const result = Array.from(event.currentTarget.selectedOptions).map((option) =>
        Number(option.value)
      );

      setValue(result);

      setForm((prev) => {
        return {
          ...prev,
          [event.target.name]: result,
        };
      });
    },
    [setForm]
  );

  useEffect(() => {
    console.log(platforms);

    setValue((prev) =>
      prev.filter((index) => {
        if (!platforms || platforms.length === 0) {
          return true;
        }

        const currentPlatform = options.filter((el) => el.value === index)[0].platform;
        return currentPlatform === undefined || platforms.includes(currentPlatform);
      })
    );
  }, [options, platforms]);

  const printInputValues = () =>
    options
      .filter((el) => value.includes(Number(el.value)))
      .map((el) => el.label)
      .join(', ');

  const clearInput = useCallback(() => {
    setValue(INITIAL_INPUT_VALUE);
    setClear(true);
    setForm((prev) => {
      return {
        ...prev,
        [name]: [],
      };
    });
  }, [name, setForm]);

  useEffect(() => {
    clearInput();
  }, [clearInput, disabled]);

  return (
    <div className="MultipleSelect">
      <input
        name={name}
        className="MultipleSelect__input"
        onFocus={handleFocus}
        placeholder="Choose..."
        value={disabled ? '' : printInputValues()}
        readOnly
        disabled={disabled}
      />
      <button className={buttonClasses} type="button" onClick={clearInput}>
        X
      </button>
      <Select
        name={name}
        options={options}
        hidden={hidden}
        multiple={true}
        onChange={handleChange}
        onBlur={handleBlur}
        platforms={platforms}
        clear={clear}
        setClear={setClear}
        absolute={true}
      />
    </div>
  );
};
