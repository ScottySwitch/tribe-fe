import classNames from "classnames";
import Icon from "components/Icon/Icon";
import React, { ReactNode, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import ReactSelect, { ControlProps, components, StylesConfig } from "react-select";
import styles from "./Select.module.scss";

interface IOption {
  label: string | ReactNode;
  value: string | number;
}

export interface SelectProps {
  id?: string;
  label?: string;
  className?: string;
  defaultValue?: IOption[] | IOption;
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
  onChange?: (value: any) => void;
  variant?: "filled" | "outlined" | "no-outlined";
  size?: "small" | "medium" | "large";
  inputRef?: any;
}

const Select = (props: SelectProps) => {
  const {
    label,
    className,
    helperText,
    id,
    prefixIcon,
    disabled,
    isMulti = false,
    options,
    value,
    placeholder,
    onChange,
    isSearchable = true,
    defaultValue,
    closeMenuOnSelect = false,
    variant = "outlined",
    size = "medium",
    menuFooter,
    inputRef,
  } = props;

  const [selected, setSelected] = useState<IOption[] | IOption | string | undefined>(
    value || defaultValue
  );

  const selectWrapperClassName = classNames(className, styles.select, {
    [styles.filled]: variant === "filled",
    [styles["no-outlined"]]: variant === "no-outlined",
    [styles.disabled]: disabled,
    [styles.large]: size === "large",
    [styles.small]: size === "small",
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
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        width: "60vw",
        padding: "10px 20px",
        maxWidth: 400,
        minWidth: 280,
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
    input: (styles) => ({ ...styles, padding: 0, margin: 0 }),
    placeholder: (styles) => ({
      ...styles,
      padding: 0,
      margin: 0,
      width: "max-content",
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: 0,
      width: "max-content",
    }),
    indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
    indicatorsContainer: (styles) => ({ ...styles, alignItems: "flex-start" }),
  };

  const handleChange = (dropdownValues: any) => {
    onChange?.(dropdownValues);
    setSelected(dropdownValues);
  };

  const Control = ({ children, ...props }: ControlProps<any, false>) => {
    // @ts-ignore
    const { emoji, onEmojiClick } = props.selectProps;
    const style = { cursor: "pointer" };

    return (
      <components.Control {...props}>
        <Icon size={20} icon={prefixIcon || ""} style={{ marginRight: 10 }} />
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

  return (
    <div className={selectWrapperClassName}>
      <div className={styles.container}>
        {label && <label htmlFor={id}>{label}</label>}
        <ReactSelect
          id={id}
          inputRef={inputRef}
          options={options}
          value={selected}
          onChange={handleChange}
          placeholder={placeholder}
          isClearable={false}
          closeMenuOnSelect={closeMenuOnSelect}
          isDisabled={disabled}
          styles={customStyles}
          // @ts-ignore
          isMulti={isMulti}
          isSearchable={isSearchable}
          components={{ Control, Menu, Option }}
        />
      </div>
      {helperText && <div>{helperText}</div>}
    </div>
  );
};

export default Select;
