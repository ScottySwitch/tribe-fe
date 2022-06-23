import classNames from "classnames"
import { ReactNode } from "react"
import styles from "./Button.module.scss"

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
  size?: "small" | "medium" | "large"
  type?: "button" | "submit" | "reset"
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
  })
  const loadingClassName = "disabled cursor-wait opacity-50 w-auto"
  return (
    <button
      className={`flex justify-center ${buttonClassName} ${isLoading && loadingClassName}`}
      id={id}
      type={type}
      disabled={disabled || isLoading}
      {...rest}
      style={{ width }}
    >
        { isLoading && (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        <div className={styles.container}>
          {prefix && <div>{prefix}</div>}
          {text}
          {suffix && <div>{suffix}</div>}
        </div>
    </button>
  )
}

export default Button
