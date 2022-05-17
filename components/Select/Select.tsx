import classNames from "classnames";
import { MouseEventHandler, ReactNode, useState } from "react";
import ReactSelect, {
  components,
  ControlProps,
  Props,
  StylesConfig,
} from "react-select";
import styles from "./Select.module.scss";
import makeAnimated from "react-select/animated";

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
    options,
    placeholder,
    defaultValue,
    variant = "outlined",
    size = "medium",
  } = props;

  const [selected, setSelected] = useState<IOption[]>(defaultValue || []);

  const selectWrapperClassName = classNames(className, styles.select, {
    [styles.filled]: variant === "filled",
    [styles["no-outlined"]]: variant === "no-outlined",
    [styles.disabled]: disabled,
    [styles.large]: size === "large",
    [styles.small]: size === "small",
  });

  const changes = {
    padding: 0,
  };

  const customStyles = {
    dropdownIndicator: (base: any) => Object.assign(base, changes),
    input: (base: any) => Object.assign(base, changes),
    valueContainer: (base: any) => Object.assign(base, changes),
    indicatorSeparator: (base: any) =>
      Object.assign(base, {
        display: "none",
      }),
  };

  const CustomOption = ({ children, ...props }: any) => {
    return (
      <components.Option {...props} className={styles.option}>
        {children}
      </components.Option>
    );
  };

  return (
    <div className={selectWrapperClassName}>
      <div className={styles.container}>
        {label && <label htmlFor={id}>{label}</label>}
        <ReactSelect
          id={id}
          options={options}
          controlShouldRenderValue={false}
          isClearable={false}
          value={selected}
          defaultValue={defaultValue}
          placeholder={placeholder}
          closeMenuOnSelect={false}
          components={{ Option: CustomOption }}
          isDisabled={disabled}
          styles={customStyles}
        />
      </div>
      {helperText && <div>{helperText}</div>}
    </div>
  );
};

export default Select;
