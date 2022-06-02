import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./Button.module.scss";

export interface ButtonProps
  extends Omit<
    React.HTMLProps<HTMLButtonElement>,
    "size" | "prefix" | "className"
  > {
  text: string;
  width?: string | number;
  className?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  variant?: "primary" | "secondary" | "outlined" | "no-outlined";
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
}

const Button = (props: ButtonProps) => {
  const {
    id,
    text,
    className,
    prefix,
    suffix,
    variant = "primary",
    size = "medium",
    disabled,
    width = "100%",
    type = "button",
    ...rest
  } = props;

  const buttonClassName = classNames(className, styles.button, {
    [styles.disabled]: disabled,
    [styles.outlined]: variant === "outlined",
    [styles.secondary]: variant === "secondary",
    [styles.no_outlined]: variant === "no-outlined",
    [styles.large]: size === "large",
    [styles.small]: size === "small",
  });

  return (
    <button
      className={buttonClassName}
      id={id}
      disabled={disabled}
      {...rest}
      style={{ width }}
    >
      <div className={styles.container}>
        {prefix && <div>{prefix}</div>}
        {text}
        {suffix && <div>{suffix}</div>}
      </div>
    </button>
  );
};

export default Button;
