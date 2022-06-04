import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./Radio.module.scss";

export interface RadioProps {
  label?: string;
  id?: string;
  name?: string;
  className?: string;
  register?: UseFormRegisterReturn;
}

const Radio = (props: RadioProps) => {
  const { label, id, name, className, register } = props;

  return (
    <label className={`${styles.container} ${className}`} htmlFor={id || label}>
      {label}
      <input type="radio" id={id || label} name={name} {...register} />
      <span className={styles.checkmark} />
    </label>
  );
};

export default Radio;
