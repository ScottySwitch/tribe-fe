import classNames from "classnames";
import { ReactNode, useState } from "react";
import ReactSelect, { StylesConfig } from "react-select";
import styles from "./Select.module.scss";

interface IOption {
  label: string | ReactNode;
  value: string | number;
}

export interface SelectProps {
  id?: string;
  label?: string;
  className?: string;
  defaultValue?: IOption[];
  options?: IOption[];
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
  isMulti?: boolean;
  onChange?: (value: any) => void;
  variant?: "filled" | "outlined" | "no-outlined";
  size?: "small" | "medium" | "large";
}

const Select = (props: SelectProps) => {
  const {
    label,
    className,
    helperText,
    id,
    disabled,
    isMulti,
    options,
    placeholder,
    onChange,
    defaultValue,
    variant = "outlined",
    size = "medium",
  } = props;

  const [selected, setSelected] = useState<IOption[] | IOption | undefined>();

  const selectWrapperClassName = classNames(className, styles.select, {
    [styles.filled]: variant === "filled",
    [styles["no-outlined"]]: variant === "no-outlined",
    [styles.disabled]: disabled,
    [styles.large]: size === "large",
    [styles.small]: size === "small",
  });

  const customStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      cursor: "pointer",
      border: "none",
      boxShadow: "none",
      fontSize: "14px",
      minHeight: "min-content",
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        cursor: isSelected ? "default" : "pointer",
        ":active": {
          ...styles[":active"],
          backgroundColor: "#E5E5E5",
        },
        ":hover": {
          ...styles[":hover"],
          backgroundColor: isSelected ? "#E60112" : "#FEF1F2",
        },
        backgroundColor: isSelected ? "#E60112" : "white",
      };
    },
    dropdownIndicator: (styles) => ({ ...styles, padding: 0 }),
    input: (styles) => ({ ...styles, padding: 0 }),
    valueContainer: (styles) => ({ ...styles, padding: 0 }),
    indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
  };

  const handleChange = (dropdownValues: any) => {
    onChange?.(dropdownValues);
    setSelected(dropdownValues);
  };

  return (
    <div className={selectWrapperClassName}>
      <div className={styles.container}>
        {label && <label htmlFor={id}>{label}</label>}
        <ReactSelect
          id={id}
          options={options}
          value={selected}
          onChange={handleChange}
          placeholder={placeholder}
          isClearable={false}
          defaultValue={defaultValue}
          closeMenuOnSelect={false}
          isDisabled={disabled}
          styles={customStyles}
          isMulti={isMulti}
        />
      </div>
      {helperText && <div>{helperText}</div>}
    </div>
  );
};

export default Select;
