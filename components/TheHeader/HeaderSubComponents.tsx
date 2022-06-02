import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { categories, contributePopOverList } from "constant";
import Popover from "components/Popover/Popover";
import Icon from "components/Icon/Icon";
import Button from "components/Button/Button";
import Menu from "components/Menu/Menu";

import styles from "./Header.module.scss";

export const Categories = (props: {
  currentCategory?: string;
  onSetCurrentCategory: (e: string) => void;
}) => {
  const { onSetCurrentCategory, currentCategory } = props;
  return (
    <React.Fragment>
      {categories.map((cat) => {
        const isSelected = currentCategory === cat.label;
        const categoryContent = (
          <React.Fragment>
            {cat.options.map((value) => (
              <div key={value.value}>{value.value}</div>
            ))}
          </React.Fragment>
        );
        return (
          <Popover key={cat.label} content={categoryContent}>
            <div
              className={`${styles.category} ${isSelected && styles.selected}`}
              onClick={() => onSetCurrentCategory(cat.label)}
            >
              <Icon icon={cat.icon} size={20} className={styles.icon} />
              <div className={cat.width}>{cat.label}</div>
            </div>
          </Popover>
        );
      })}
    </React.Fragment>
  );
};

export const ContributeContent = () => (
  <React.Fragment>
    {contributePopOverList.map((item) => (
      <div key={item.label}>
        <Icon icon={item.icon} size={20} />
        {item.label}
      </div>
    ))}
  </React.Fragment>
);

export const UserInfor = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const router = useRouter();

  return isLoggedIn ? (
    <>
      <Popover content={<ContributeContent />}>
        <Button
          prefix={<Icon icon="plus" size={20} />}
          size="small"
          text="Contribute"
          className={styles.contribute_button}
        />
      </Popover>
      <Icon icon="noti-color" size={20} />
      <Popover
        content={<Menu isLoggedIn={isLoggedIn} />}
        position="bottom-left"
      >
        <Image
          src={require("public/images/avatar.png")}
          alt=""
          width={40}
          height={40}
        />
      </Popover>
    </>
  ) : (
    <>
      <Button
        text="Sign up"
        variant="outlined"
        onClick={() => router.push("/signup")}
        size="small"
      />
      <Button text="Login" onClick={() => router.push("/login")} size="small" />
    </>
  );
};
