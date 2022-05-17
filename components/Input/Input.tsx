import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./Input.module.scss";

export interface InputProps
  extends Omit<
    React.HTMLProps<HTMLInputElement>,
    "size" | "prefix" | "className"
  > {
  label?: string;
  className?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  variant?: "filled" | "outlined";
  helperText?: string;
  size?: "small" | "medium" | "large";
}

const Input = (props: InputProps) => {
  const {
    label,
    className,
    prefix,
    suffix,
    variant = "outlined",
    helperText,
    size = "medium",
    id,
    disabled,
    ...rest
  } = props;

  const inputWrapperClassName = classNames(className, styles.input, {
    [styles.filled]: variant === "filled",
    [styles.disabled]: disabled,
    [styles.large]: size === "large",
    [styles.small]: size === "small",
  });

  return (
    <div className={inputWrapperClassName}>
      <div className={styles.container}>
        <label htmlFor={id}>{label}</label>
        <div className={styles.content}>
          {prefix && <div>{prefix}</div>}
          <input disabled={disabled} id={id} {...rest} />
          {suffix && <div>{suffix}</div>}
        </div>
      </div>
      {helperText && <div>{helperText}</div>}
    </div>
  );
};

export default Input;
