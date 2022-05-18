import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Select from "components/Select/Select";
import styles from "./Header.module.scss";

const locations = [
  { label: "Singapore", value: "singapore" },
  { label: "Malaysia", value: "malaysia" },
  { label: "Indonesia", value: "indonesia" },
  { label: "India", value: "india" },
  { label: "Thailand", value: "thailand" },
];

const languages = [
  { label: "English", value: "en" },
  { label: "Thailand", value: "th" },
  { label: "Vietnam", value: "vn" },
];

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.navbar_top}>
          <div className={styles.left_col}>
            <Icon icon="location" size={50} />
            <Select
              variant="no-outlined"
              placeholder="Location"
              options={locations}
            />
            <Select options={languages} />
          </div>
          <div className={styles.right_col}>
            <Button text="Sign up" variant="outlined" />
            <Button text="Login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
