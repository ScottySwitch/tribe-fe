import styles from "./Switch.module.scss";

interface SwitchProps {
  onClick?: () => void;
  activeSwitch?: boolean;
}

const Switch = (props: SwitchProps) => {
  const {onClick, activeSwitch} = props

  return (
    <label className={`${styles.switch} ${activeSwitch == true ? styles.active : styles.none_active}`} onClick={onClick}>
      {/* <input type="checkbox" /> */}
      <span className={`${styles.slider} ${styles.round}`} />
    </label>
  );
};

export default Switch;
