import styles from "./Radio.module.scss";

export interface RadioProps {
  label?: string;
  id?: string;
  name?: string;
}

const Radio = (props: RadioProps) => {
  const { label, id, name } = props;

  return (
    <label className={styles.container} htmlFor={id || label}>
      {label}
      <input type="radio" id={id || label} name={name} />
      <span className={styles.checkmark} />
    </label>
  );
};

export default Radio;
