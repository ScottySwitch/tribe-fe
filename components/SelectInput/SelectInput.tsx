import classNames from "classnames"
import Select from "components/Select/Select"
import { ReactNode, useState } from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import { IOption } from "type"
import SelectField from "./SelectField"
import styles from "./SelectInput.module.scss"

export interface SelectInputProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "onChange" | "size" | "prefix" | "className"> {
  label?: string
  register?: UseFormRegisterReturn
  className?: string
  prefix?: ReactNode
  suffix?: ReactNode
  helperText?: string
  options?: any[]
  width?: string | number
  menuWidth?: string | number
  selectPlaceholder?: string
  shouldControlShowValue?: boolean
  selectWidth?: string | number
  isSearchable?: boolean
  selectPosition?: "prefix" | "suffix"
  variant?: "filled" | "outlined"
  size?: "small" | "medium" | "large"
  onChange?: ({ select, input }: { select: IOption; input: string }) => void
}

const SelectInput = (props: SelectInputProps) => {
  const {
    label,
    className,
    prefix,
    suffix,
    variant = "outlined",
    helperText,
    size = "medium",
    id,
    width,
    form,
    selectPosition = "prefix",
    disabled,
    register,
    menuWidth,
    options = [],
    selectPlaceholder,
    isSearchable,
    selectWidth,
    shouldControlShowValue,
    onChange,
    ...rest
  } = props

  const selectInputWrapperClassName = classNames(className, styles.select_input, {
    [styles.select_suffix]: selectPosition === "suffix",
    [styles.filled]: variant === "filled",
    [styles.disabled]: disabled,
    [styles.large]: size === "large",
    [styles.small]: size === "small",
    [styles.label]: label,
  })

  const [localValue, setLocalValue] = useState({ select: { label: "", value: "" }, input: "" })

  const handleChange = (type, e) => {
    setLocalValue({ ...localValue, [type]: e })
    onChange?.({ ...localValue, [type]: e })
  }

  const Select = () => (
    <SelectField
      isSearchable={isSearchable}
      selectWidth={selectWidth}
      menuWidth={menuWidth}
      options={options}
      placeholder={selectPlaceholder}
      shouldControlShowValue={shouldControlShowValue}
      onChange={(e) => handleChange("select", e)}
    />
  )

  return (
    <div className={selectInputWrapperClassName} style={{ width }}>
      <div className={styles.container}>
        {label && <label htmlFor={id}>{label}</label>}
        <div className={styles.content}>
          {prefix && <div>{prefix}</div>}
          {selectPosition === "prefix" && <Select />}
          <input
            disabled={disabled}
            id={id}
            onChange={(e) => handleChange("input", e.target.value)}
            {...rest}
          />
          {selectPosition === "suffix" && <Select />}
          {suffix && <div>{suffix}</div>}
        </div>
      </div>
      {helperText && <div>{helperText}</div>}
    </div>
  )
}

export default SelectInput
