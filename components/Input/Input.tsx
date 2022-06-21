import classNames from "classnames"
import { ReactNode } from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import styles from "./Input.module.scss"

export interface InputProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "size" | "prefix" | "className"> {
  label?: string
  register?: UseFormRegisterReturn
  className?: string
  prefix?: ReactNode
  suffix?: ReactNode
  helperText?: string
  width?: string | number
  variant?: "filled" | "outlined"
  size?: "small" | "medium" | "large"
}

const Input = (props: InputProps) => {
  const {
    label,
    className,
    prefix,
    suffix,
    readOnly,
    variant = "outlined",
    helperText,
    size = "medium",
    id,
    width,
    form,
    disabled,
    register,
    ...rest
  } = props

  const inputWrapperClassName = classNames(className, styles.input, {
    [styles.filled]: variant === "filled",
    [styles.disabled]: disabled,
    [styles.large]: size === "large",
    [styles.small]: size === "small",
    [styles.label]: label,
  })

  return (
    <div className={inputWrapperClassName} style={{ width }}>
      <div className={styles.container}>
        {label && <label htmlFor={id}>{label}</label>}
        <div className={styles.content}>
          {prefix && <div className={styles.prefix_container}>{prefix}</div>}
          <input readOnly={readOnly} disabled={disabled} id={id} {...register} {...rest} />
          {suffix && <div className={styles.suffix_container}>{suffix}</div>}
        </div>
      </div>
      {helperText && <div>{helperText}</div>}
    </div>
  )
}

export default Input
