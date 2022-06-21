import React, { ReactNode, useState } from "react"
import ReactSelect, { ControlProps, components, StylesConfig } from "react-select"

interface IOption {
  label: string | ReactNode
  value: string | number
}

export interface SelectProps {
  id?: string
  defaultValue?: IOption[] | IOption
  value?: IOption[] | IOption | string
  options?: IOption[]
  disabled?: boolean
  placeholder?: string
  isMulti?: boolean
  closeMenuOnSelect?: boolean
  menuWidth?: string | number
  onChange?: (value: any) => void
  inputRef?: any
  selectWidth?: string | number
  isSearchable?: boolean
  shouldControlShowValue?: boolean
}

const SelectField = (props: SelectProps) => {
  const {
    id,
    disabled,
    isMulti = false,
    options,
    value,
    placeholder,
    onChange,
    defaultValue,
    closeMenuOnSelect = false,
    menuWidth,
    selectWidth = "fit-content",
    shouldControlShowValue,
    isSearchable = true,
    inputRef,
  } = props

  const [selected, setSelected] = useState<IOption[] | IOption | string | undefined>(
    value || defaultValue
  )

  const primary500 = "#E60112"
  const primary20 = "#FEF1F2"

  const customStyles: StylesConfig = {
    container: (styles) => ({
      ...styles,
      width: selectWidth,
      boxSizing: "border-box",
    }),
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
    }),
    menu: (styles) => ({
      ...styles,
      width: menuWidth,
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        width: "fit-content",
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
      }
    },
    dropdownIndicator: (styles) => ({ ...styles, padding: 0 }),
    input: (styles) => ({ ...styles, padding: 0, margin: 0, fontWeight: 300 }),
    placeholder: (styles) => ({
      ...styles,
      padding: 0,
      margin: 0,
      width: "fit-content",
      fontWeight: 300,
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: 0,
      width: "max-content",
    }),
    indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
    indicatorsContainer: (styles) => ({ ...styles, alignItems: "center" }),
  }

  const handleChange = (dropdownValues: any) => {
    onChange?.(dropdownValues)
    setSelected(dropdownValues)
  }

  const Control = ({ children, ...props }: ControlProps<any, false>) => {
    return <components.Control {...props}>{children}</components.Control>
  }

  const Option = (props: any) => {
    return (
      <React.Fragment>
        <components.Option {...props}>{props.children}</components.Option>
      </React.Fragment>
    )
  }

  const SingleValue = (props) => (
    <components.SingleValue {...props}>
      {shouldControlShowValue ? props.data.value : props.data.label}
    </components.SingleValue>
  )

  return (
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
      controlShouldRenderValue={true}
      // @ts-ignore
      isMulti={isMulti}
      isSearchable={isSearchable}
      components={{ Control, Option, SingleValue }}
    />
  )
}

export default SelectField
