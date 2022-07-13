import React, { ReactNode, useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import classNames from "classnames";
import ReactSelect, {
  ControlProps,
  components,
  StylesConfig,
} from "react-select";

import Icon from "components/Icon/Icon";

import styles from "./Select.module.scss";

interface IOption {
  label: string | ReactNode;
  value: string | number;
}

export interface SelectProps {
  id?: string;
  label?: string;
  className?: string;
  defaultValue?: IOption[] | IOption | string;
  value?: IOption[] | IOption | string;
  options?: IOption[];
  prefixIcon?: string;
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  closeMenuOnSelect?: boolean;
  menuFooter?: ReactNode;
  register?: UseFormRegisterReturn;
  width?: number | string;
  menuWidth?: string | number;
  variant?: "filled" | "outlined" | "no-outlined";
  size?: "small" | "medium" | "large";
  inputRef?: any;
  shouldControlShowValue?: boolean;
  controlStyle?: any;
  placeholderStyle?: any;
  onChange?: (value: any) => void;
}

const Select = (props: SelectProps) => {
  const {
    label,
    className,
    helperText,
    id,
    width,
    prefixIcon,
    disabled,
    isMulti = false,
    options,
    value,
    shouldControlShowValue,
    placeholder,
    isSearchable = true,
    defaultValue,
    closeMenuOnSelect = false,
    menuWidth,
    menuFooter,
    inputRef,
    controlStyle,
    placeholderStyle,
    variant = "outlined",
    size = "medium",
    onChange,
  } = props;

  const [selected, setSelected] = useState<IOption[] | IOption | string>();

  useEffect(() => {
    const getInitValue = (value) =>
      options?.find((opt) => opt === value || opt.value === value);

    setSelected(getInitValue(value || defaultValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, defaultValue]);

  const selectWrapperClassName = classNames(className, styles.select, {
    [styles.filled]: variant === "filled",
    [styles["no-outlined"]]: variant === "no-outlined",
    [styles.disabled]: disabled,
    [styles.large]: size === "large",
    [styles.small]: size === "small",
    [styles.label]: label,
  });

  const primary500 = "#E60112";
  const primary20 = "#FEF1F2";

  const customStyles: StylesConfig = {
    container: (styles) => ({ ...styles, width: "100%" }),
    control: (styles) => ({
      ...styles,
      cursor: "pointer",
      border: "none",
      boxShadow: "none",
      fontSize: "14px",
      width: "100%",
      minWidth: "max-content",
      minHeight: "min-content",
      backgroundColor: "transparent",
      fontWeight: 300,
      ...controlStyle,
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        width: menuWidth || "60vw",
        padding: "10px 20px",
        maxWidth: 400,
        minWidth: 150,
        cursor: isSelected ? "default" : "pointer",
        ":active": {
          ...styles[":active"],
          backgroundColor: "#E5E5E5",
        },
        ":hover": {
          ...styles[":hover"],
          backgroundColor: isSelected ? primary500 : primary20,
        },
        backgroundColor: isSelected ? primary500 : "white",
      };
    },
    dropdownIndicator: (styles) => ({ ...styles, padding: 0 }),
    input: (styles) => ({ ...styles, padding: 0, margin: 0, fontWeight: 300 }),
    placeholder: (styles) => ({
      ...styles,
      padding: 0,
      margin: 0,
      width: "max-content",
      fontWeight: 300,
      ...placeholderStyle,
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: 0,
      width: "max-content",
    }),
    indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
    indicatorsContainer: (styles) => ({ ...styles, alignItems: "center" }),
  };

  const handleChange = (dropdownValues: any) => {
    onChange?.(dropdownValues);
    setSelected(dropdownValues);
  };

  const Control = ({ children, ...props }: ControlProps<any, false>) => {
    return (
      <components.Control {...props}>
        <Icon size={20} icon={prefixIcon || ""} className="mr-[10px]" />
        {children}
      </components.Control>
    );
  };

  const Menu = (props: any) => {
    return (
      <React.Fragment>
        <components.Menu {...props}>
          {props.children}
          {menuFooter}
        </components.Menu>
      </React.Fragment>
    );
  };

  const Option = (props: any) => {
    return (
      <React.Fragment>
        <components.Option {...props}>{props.children}</components.Option>
      </React.Fragment>
    );
  };

  const SingleValue = (props) => (
    <components.SingleValue {...props}>
      {shouldControlShowValue ? props.data.value : props.data.label}
    </components.SingleValue>
  );

  return (
    <div className={selectWrapperClassName} style={{ width }}>
      <div className={styles.container}>
        {label && <label htmlFor={id}>{label}</label>}
        <ReactSelect
          id={id}
          inputRef={inputRef}
          options={options}
          value={selected}
          placeholder={placeholder}
          isClearable={false}
          closeMenuOnSelect={closeMenuOnSelect}
          isDisabled={disabled}
          styles={customStyles}
          // @ts-ignore
          isMulti={isMulti}
          isSearchable={isSearchable}
          onChange={handleChange}
          components={{ Control, Menu, Option, SingleValue }}
        />
      </div>
      {helperText && <div>{helperText}</div>}
    </div>
  );
};

export default Select;
