import classNames from "classnames"
import { ReactNode } from "react"
import styles from "./Button.module.scss"
import Loading from "./Loading"

export interface ButtonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, "size" | "prefix" | "className"> {
  text: string
  width?: string | number
  className?: string
  prefix?: ReactNode
  suffix?: ReactNode
  variant?:
    | "primary"
    | "secondary"
    | "outlined"
    | "no-outlined"
    | "secondary-no-outlined"
    | "underlined"
    | ""
  size?: "small" | "medium" | "large"
  type?: "button" | "submit" | "reset"
  backgroundColor?: string
  isLoading?: boolean
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
    width,
    type = "button",
    isLoading,
    backgroundColor,
    ...rest
  } = props

  const buttonClassName = classNames(className, styles.button, {
    [styles.disabled]: disabled,
    [styles.outlined]: variant === "outlined",
    [styles.underlined]: variant === "underlined",
    [styles.secondary]: variant === "secondary",
    [styles.no_outlined]: variant === "no-outlined",
    [styles.secondary_no_outlined]: variant === "secondary-no-outlined",
    [styles.large]: size === "large",
    [styles.small]: size === "small",
    [styles.loading]: isLoading,
  })
  return (
    <button
      className={buttonClassName}
      id={id}
      type={type}
      disabled={disabled || isLoading}
      {...rest}
      style={{ width, backgroundColor }}
    >
      {isLoading && <Loading />}
      <div className={styles.container}>
        {prefix && <div>{prefix}</div>}
        {text}
        {suffix && <div>{suffix}</div>}
      </div>
    </button>
  )
}

export default Button
