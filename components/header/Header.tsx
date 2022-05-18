import classNames from "classnames";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Popover from "components/Popover/Popover";
import Select from "components/Select/Select";
import Image from "next/image";
import React, { useState } from "react";
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

const categories = [
  {
    width: "w-[30px]",
    icon: "buy-color",
    label: "Buy",
    values: [
      { label: "Restaurant", value: "restaurant" },
      { label: "Quick bites", value: "quick-bites" },
      { label: "Bakeries", value: "bakeries" },
      { label: "Coffee & Tea", value: "coffee-tea" },
      { label: "Dessert", value: "dessert" },
    ],
  },
  {
    width: "w-[30px]",
    icon: "eat-color",
    label: "Eet",
    values: [
      { label: "Restaurant", value: "restaurant" },
      { label: "Quick bites", value: "quick-bites" },
      { label: "Bakeries", value: "bakeries" },
      { label: "Coffee & Tea", value: "coffee-tea" },
      { label: "Dessert", value: "dessert" },
    ],
  },
  {
    width: "w-[70px]",
    icon: "camera-color",
    label: "See & Do",
    values: [
      { label: "Restaurant", value: "restaurant" },
      { label: "Quick bites", value: "quick-bites" },
      { label: "Bakeries", value: "bakeries" },
      { label: "Coffee & Tea", value: "coffee-tea" },
      { label: "Dessert", value: "dessert" },
    ],
  },
  {
    width: "w-[80px]",
    icon: "car-color",
    label: "Transport",
    values: [
      { label: "Restaurant", value: "restaurant" },
      { label: "Quick bites", value: "quick-bites" },
      { label: "Bakeries", value: "bakeries" },
      { label: "Coffee & Tea", value: "coffee-tea" },
      { label: "Dessert", value: "dessert" },
    ],
  },
  {
    width: "w-[30px]",
    icon: "bed-color",
    label: "Stay",
    values: [
      { label: "Restaurant", value: "restaurant" },
      { label: "Quick bites", value: "quick-bites" },
      { label: "Bakeries", value: "bakeries" },
      { label: "Coffee & Tea", value: "coffee-tea" },
      { label: "Dessert", value: "dessert" },
    ],
  },
];

const Header = () => {
  const [currentCategory, setCurrentCategory] = useState<string | undefined>();

  const renderCategories = categories.map((cat) => {
    const isSelected = currentCategory === cat.label;
    const content = (
      <React.Fragment>
        {cat.values.map((value) => (
          <div key={value.value}>{value.value}</div>
        ))}
      </React.Fragment>
    );
    return (
      <Popover key={cat.label} content={content} visible={isSelected}>
        <div
          className={`${styles.category} ${isSelected && styles.selected}`}
          onClick={() => setCurrentCategory(cat.label)}
        >
          <Icon icon={cat.icon} size={20} className={styles.icon} />
          <div className={cat.width}>{cat.label}</div>
        </div>
      </Popover>
    );
  });

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
          <div
            className={styles.categories}
            tabIndex={1}
            onBlur={() => setCurrentCategory(undefined)}
          >
            {renderCategories}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
