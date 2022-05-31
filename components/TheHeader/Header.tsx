import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Popover from "components/Popover/Popover";
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
  { label: <Icon icon="eng-flag" size={30} />, value: "en" },
  { label: <Icon icon="indo-flag" size={30} />, value: "th" },
  { label: <Icon icon="sing-flag" size={30} />, value: "vn" },
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
    label: "Eat",
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

const Header = (props: {
  onOpenHamMenu: () => void;
  isAuthPage?: boolean;
  id: string;
}) => {
  const { id, onOpenHamMenu } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | undefined>();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) setIsLoggedIn(true);
  }, []);

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
      <Popover key={cat.label} content={content}>
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
    <div id={id} className={styles.header}>
      <div className={styles.header_top}>
        <div className={styles.content}>
          <div className={styles.left_col}>
            <Icon icon="map" size={20} />
            <Select
              className={styles.location}
              variant="no-outlined"
              placeholder="Location"
              options={locations}
            />
            <Select
              className={styles.language}
              options={languages}
              isSearchable={false}
              variant="no-outlined"
            />
          </div>
          <div className={styles.right_col}>
            <Icon icon="business" size={60} />
            <div>Business</div>
            <Button
              text="Sign up"
              variant="outlined"
              onClick={() => router.push("/signup")}
            />
            <Button text="Login" onClick={() => router.push("/login")} />
          </div>
        </div>
      </div>
      <div className={styles.header_bottom}>
        <div className={styles.content}>
          <Image
            style={{ cursor: "pointer" }}
            src={require("public/logo.svg")}
            alt="logo"
            onClick={() => router.push("/")}
          />
          <Input
            className={styles.search}
            prefix={<Icon icon="search" size={20} />}
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
          <div className={styles.mobile}>
            <Icon className={styles.mobile_searchr} icon="search" size={25} />
            <div onClick={onOpenHamMenu}>
              <Icon
                className={styles.mobile_hamburger}
                icon="ham-menu"
                size={25}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
