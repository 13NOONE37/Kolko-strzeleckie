import React, { FC, useState } from 'react';
import ReactSelect from 'react-select';

type SelectOption = {
  label: string;
  value: string | number;
};
interface SelectProps {
  placeholder: string;
  defaultValue?: SelectOption | undefined;
  changeCallback: () => void;
  options: SelectOption[];
  isSearchable: boolean;
  width?: string;
}
const Select: FC<SelectProps> = ({
  placeholder,
  defaultValue,
  changeCallback,
  options,
  isSearchable,
  width,
}) => {
  const [isOpen, setIsOpen] = useState(!false);
  const [highlithedIndex, setHighlithedIndex] = useState(null);
  return (
    <div
      style={{
        color: 'var(--light__1)',
        width: width ?? 'auto',
      }}
    >
      <ReactSelect
        className={'sadf'}
        placeholder={placeholder}
        defaultValue={defaultValue}
        options={options}
        onChange={changeCallback}
        isSearchable={isSearchable}
        noOptionsMessage={() => 'Brak wyników'}
        styles={{
          control: (base) => ({
            ...base,
            borderWidth: '2px',
          }),
        }}
        theme={(theme) => ({
          ...theme,

          colors: {
            ...theme.colors,
            neutral0: '#1c2232', //background-color
            neutral20: '#242a3a', //border-color
            neutral80: ' #02d0c8', //text selected in placeholder
            neutral30: 'var(--primary__1)', //hover border
            neutral40: 'var(--light__1)', //icon-hover-color
            neutral50: '#6c7181', //placeholder
            primary25: 'var(--dark__1__alpha)', //current-select
            primary: 'var(--light__2)', //active
            primary50: 'var(--background__1)', //option pressed
          },
        })}
      />
    </div>
  );
};

export default Select;
