import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./Checkbox.module.scss";

export interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  value?: string;
  name?: string;
  className?: string;
  register?: UseFormRegisterReturn;
}

const Checkbox = (props: CheckboxProps) => {
  const { label, name, register, className, ...rest } = props;
  return (
    <div className={`${styles.checkbox} ${className}`}>
      <input id={label} type="checkbox" {...register} {...rest} />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default Checkbox;
