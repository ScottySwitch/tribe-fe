import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import Image from "next/image";
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
      <div className={styles.navbar_top}>
        <div className={styles.content}>
          <div className={styles.left_col}>
            <Icon icon="location" size={50} />
            <Select
              variant="no-outlined"
              placeholder="Location"
              options={locations}
            />
            <Select options={languages} variant="no-outlined" />
          </div>
          <div className={styles.right_col}>
            <Icon icon="business" size={20} />
            <div>Business</div>
            <Button text="Sign up" variant="outlined" />
            <Button text="Login" />
          </div>
        </div>
      </div>
      <div className={styles.navbar_bottom}>
        <div className={styles.content}>
          <Image src={require("public/logo.svg")} alt="logo" />
          <Input
            className={styles.search}
            variant="filled"
            placeholder="Search"
          />
          <div className={styles.categories}>
            <div className={styles.category}>
              <Icon icon="buy-color" size={20} className={styles.icon} />
              Buy
            </div>
            <div className={styles.category}>
              <Icon icon="eat-color" size={20} className={styles.icon} />
              Eat
            </div>
            <div className={styles.category}>
              <Icon icon="camera-color" size={20} className={styles.icon} />
              See & Do
            </div>
            <div className={styles.category}>
              <Icon icon="car-color" size={20} className={styles.icon} />
              Transport
            </div>
            <div className={styles.category}>
              <Icon icon="bed-color" size={20} className={styles.icon} />
              Stay
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
