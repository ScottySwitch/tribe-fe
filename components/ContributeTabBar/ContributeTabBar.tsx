import Icon from "components/Icon/Icon";
import Popover from "components/Popover/Popover";
import { contributePopOverList } from "constant";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "./ContributeTabBar.module.scss";
import AuthPopup from "components/AuthPopup/AuthPopup";
import { Tiers, UsersTypes } from "enums";

export interface ContributeProps {
  id?: string;
  visible: boolean;
}

export type ILoginInfor = {
  token?: string;
  type?: UsersTypes;
  tier?: Tiers;
  avatar?: string;
};

const ContributeTabBar = (props: ContributeProps) => {
  const { id, visible } = props;
  const router = useRouter();
  const pathname = router.pathname;
  const notAuthPages = [
    "/login",
    "/signup",
    "/forgot-password",
    "/forgot-password/otp",
    "/forgot-password/reset",
    "/signup/otp",
    "/signup/setup-profile",
    "/biz/verify",
  ];
  const isAuthPage = !notAuthPages.includes(pathname);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [loginInfor, setLoginInfo] = useState<ILoginInfor>({});

  const handleHref = (href: string) => {
    const stringyLoginInfo = localStorage.getItem("user");
    const localLoginInfo = stringyLoginInfo ? JSON.parse(stringyLoginInfo) : {};
    if (localLoginInfo.token) {
      router.push(href)
    } else {
      setLoginInfo({});
      setShowAuthPopup(true);
    }
  }


  const content = (
    <React.Fragment>
      {contributePopOverList.map((item) => (
        <div
          key={item.label}
          className={styles.popover_modal_item}
          onClick={() => router.push(item.href)}
        >
          <Icon icon={item.icon} size={20} />
          {item.label}
        </div>
      ))}
    </React.Fragment>
  );

  if (!visible) {
    return null;
  }

  return (
    <div id={id} className={styles.contribute}>
      <div onClick={() => router.push(`/`)}>
        <Icon icon="home-stroke-1" size={20} />
        Home
      </div>
      <div onClick={() => handleHref(`/profile`)}>
        <Icon icon="deal" size={20} />
        Deals
      </div>
      <Popover content={content} position="top">
        <div className={styles.main_button} />
      </Popover>
      <div onClick={() => handleHref(`/profile`)}>
        <Icon icon="like-solid" size={20} />
        Favorited
      </div>
      <div onClick={() => handleHref(`/profile`)}>
        <Icon icon="user-stroke-1" size={20} />
        User
      </div>
      <AuthPopup
        onClose={() => setShowAuthPopup(false)}
        visible={isAuthPage && showAuthPopup && !loginInfor.token}
      />
    </div>
  );
};

export default ContributeTabBar;
