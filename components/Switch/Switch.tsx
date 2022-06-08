import styles from "./Switch.module.scss";

const Switch = () => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked />
      <span className={`${styles.slider} ${styles.round}`} />
    </label>
  );
};

export default Switch;
