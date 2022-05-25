import styles from "./Checkbox.module.scss";

const Checkbox = () => {
  return (
    <div className={styles.checkbox}>
      <input id={"all"} type="checkbox" />
      <label
        htmlFor={"all"}
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        all
      </label>
    </div>
  );
};

export default Checkbox;
