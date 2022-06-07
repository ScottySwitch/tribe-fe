import { ReactNode } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import styles from "./Checkbox.module.scss";

export interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  label?: any;
  className?: string;
  register?: UseFormRegisterReturn;
}

const Checkbox = (props: CheckboxProps) => {
  const { label, className, register, ...rest } = props;
  return (
    <div className={`${styles.checkbox} ${className}`}>
      <input id={label} type="checkbox" {...register} {...rest} />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default Checkbox;
