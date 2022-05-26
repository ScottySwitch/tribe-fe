import styles from "./Checkbox.module.scss";

export interface CheckboxProps {
  label?: string;
  value?: string;
  name?: string;
}

const Checkbox = (props: CheckboxProps) => {
  const { label, value, name } = props;
  return (
    <div className={styles.checkbox}>
      <input name={name} id={label} type="checkbox" />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default Checkbox;
