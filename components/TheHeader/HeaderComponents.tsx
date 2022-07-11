import get from "lodash/get";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { contributePopOverList } from "constant";
import Popover from "components/Popover/Popover";
import Icon from "components/Icon/Icon";
import Button from "components/Button/Button";
import Menu from "components/Menu/Menu";
import { ILoginInfor } from "pages/_app";
import { UsersTypes } from "enums";

import styles from "./Header.module.scss";

export const Categories = (props: {
  currentCategory?: string;
  onSetCurrentCategory: (e: string) => void;
  navList: { [key: string]: any }[];
}) => {
  const { onSetCurrentCategory, currentCategory, navList } = props;
  const router = useRouter();

  return (
    <React.Fragment>
      {navList.map((cat) => {
        const isSelected = currentCategory === cat.category;
        const categoryContent = (
          <React.Fragment>
            {cat.items.map((value) => (
              <div
                key={value.value}
                onClick={() => router.push(`/${cat.slug}/${value.value}`)}
              >
                {value.label}
              </div>
            ))}
          </React.Fragment>
        );
        return (
          <Popover key={cat.category} content={categoryContent}>
            <div
              className={`${styles.category} ${isSelected && styles.selected}`}
              onClick={() => onSetCurrentCategory(cat.category)}
            >
              <Icon icon={cat.icon} size={20} className={styles.icon} />
              <div className={cat.width}>{cat.category}</div>
            </div>
          </Popover>
        );
      })}
    </React.Fragment>
  );
};

export const ContributeContent = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      {contributePopOverList.map((item) => (
        <div key={item.label} onClick={() => router.push(item.href)}>
          <Icon icon={item.icon} size={20} />
          {item.label}
        </div>
      ))}
    </React.Fragment>
  );
};

export const SwitchAccountsContent = ({ onSwitchToNormalUser }) => {
  const router = useRouter();
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const userOwnerListing = userInfo.owner_listings || [];
  const ownerListing = userOwnerListing.map((item) => item.attributes);
  const {
    query: { listingSlug },
  } = router;
  return (
    <React.Fragment>
      {ownerListing.map((item) => (
        <div
          key={item.name}
          className={`${styles.wrapper_content} cursor-pointer`}
        >
          <Image
            src={item.images[0] || require("public/images/page-avatar.png")}
            alt=""
            width={30}
            height={30}
            onClick={() => router.push(`/biz/information/${item.slug}`)}
            style={{ borderRadius: "50%" }}
          />
          <div
            onClick={() =>
              (window.location.href = `/biz/home/${item.slug}/edit`)
            }
            className={styles.name}
          >
            {item.name}
            {listingSlug === item.slug && (
              <Icon icon="icon-check-bold" size={14} color="#4acc8f" />
            )}
          </div>
        </div>
      ))}
      <div className="cursor-pointer flex" onClick={onSwitchToNormalUser}>
        <Image
          src={userInfo.avatar || require("public/images/avatar.png")}
          alt=""
          width={30}
          height={30}
          style={{ borderRadius: "50%" }}
        />
        <div>
          <strong>
            {userInfo.first_name} {userInfo.last_name}
          </strong>
          <p className="text-xs">User account</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export const UserInfor = ({ loginInfor = {} }: { loginInfor: ILoginInfor }) => {
  const router = useRouter();

  const handleSwitchToBizUser = () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    userInfo.type = UsersTypes.BIZ_USER;
    localStorage.setItem("user", JSON.stringify(userInfo));
    if (get(userInfo, "owner_listings.length") > 0) {
      window.location.href = `/biz/home/${get(
        userInfo,
        "owner_listings[0].attributes.slug"
      )}/edit`;
      // router.push(`/biz/home/${get(userInfo, 'owner_listings[0].attributes.slug')}/edit`)
    } else {
      router.push("/claim");
    }
  };

  const handleSwitchToNormalUser = () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    userInfo.type = UsersTypes.NORMAL_USER;
    localStorage.setItem("user", JSON.stringify(userInfo));
    window.location.href = "/";
  };

  if (!!loginInfor.token && loginInfor.type === UsersTypes.NORMAL_USER) {
    return (
      <>
        <div
          className="flex gap-2 cursor-pointer mr-[32px]"
          onClick={handleSwitchToBizUser}
        >
          <Icon icon="business" size={20} />
          Business
        </div>
        <Popover content={<ContributeContent />}>
          <Button
            prefix={<Icon icon="plus" size={20} />}
            text="Contribute"
            className={styles.contribute_button}
          />
        </Popover>
        {/* <Icon icon="noti-color" size={20} /> */}
        <Popover
          content={<Menu loginInfor={loginInfor} />}
          position="bottom-left"
        >
          <Image
            src={loginInfor.avatar || require("public/images/avatar.png")}
            alt=""
            width={40}
            height={40}
            className={styles.avatar}
          />
        </Popover>
      </>
    );
  }
  if (!!loginInfor.token && loginInfor.type === UsersTypes.BIZ_USER) {
    return (
      <>
        <Popover
          content={
            <SwitchAccountsContent
              onSwitchToNormalUser={handleSwitchToNormalUser}
            />
          }
          position="bottom-left"
        >
          <div className="flex gap-2 items-center">
            <Icon icon="user-color" size={20} />
            Switch accounts
          </div>
        </Popover>
        <Image
          src={
            get(
              JSON.parse(localStorage.getItem("user") || "{}"),
              "now_biz_listing.logo[0]"
            ) || require("public/images/page-avatar.png")
          }
          alt=""
          width={40}
          height={40}
          onClick={() =>
            router.push(
              `/biz/information/${get(
                JSON.parse(localStorage.getItem("user") || "{}"),
                "now_biz_listing.slug"
              )}`
            )
          }
          className={`${styles.avatar} cursor-pointer`}
        />
      </>
    );
  }
  return (
    <>
      <Button
        text="Sign up"
        variant="outlined"
        onClick={() => router.push("/signup")}
      />
      <Button text="Login" onClick={() => router.push("/login")} />
    </>
  );
};
