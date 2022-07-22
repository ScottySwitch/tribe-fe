import get from "lodash/get";
import React, { useContext, useEffect, useState } from "react";
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
import AuthApi from "services/auth";
import bizListingApi from "services/biz-listing";
import { UserInforContext } from "Context/UserInforContext";

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

export const SwitchAccountsContent = () => {
  const [ownerListing, setOwnerListing] = useState<any[]>([]);
  const [userInfor, setUserInfor] = useState<any>({});
  const router = useRouter();
  const { user } = useContext(UserInforContext);

  console.log(user);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    const userOwnerListing = userInfo.owner_listings || [];
    const ownerListing = userOwnerListing.map((item) => item.attributes);
    setUserInfor(userInfo);
    setOwnerListing(ownerListing);
  }, [router.pathname]);

  const { query } = router;
  const { listingSlug } = query;

  const handleSwitchToNormalUser = async () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    userInfo.type = UsersTypes.NORMAL_USER;
    localStorage.setItem("user", JSON.stringify(userInfo));
    await router.push("/");
    router.reload();
  };

  const handleGotoOwnedListing = async (item) => {
    await router.push(`/biz/home/${item.slug}/edit`);
    router.reload();
  };

  return (
    <React.Fragment>
      {ownerListing.map((item) => (
        <div
          key={item.name}
          className={`${styles.wrapper_content} flex gap-3 cursor-pointer`}
          onClick={() => handleGotoOwnedListing(item)}
        >
          <Image
            src={
              get(item, "logo[0]") || require("public/images/page-avatar.png")
            }
            alt=""
            width={30}
            height={30}
            style={{ borderRadius: "50%" }}
          />
          <div className={styles.name}>
            {item.name}
            {listingSlug === item.slug && (
              <Icon icon="icon-check-bold" size={14} color="#4acc8f" />
            )}
          </div>
        </div>
      ))}
      <div
        className="cursor-pointer flex items-center gap-3"
        onClick={handleSwitchToNormalUser}
      >
        <Image
          src={userInfor.avatar || require("public/images/avatar.png")}
          alt=""
          width={30}
          height={30}
          style={{ borderRadius: "50%" }}
        />
        <div>
          <strong>
            {userInfor.first_name} {userInfor.last_name}
          </strong>
          <p className="text-xs">User account</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export const UserInfor = ({ loginInfor = {} }: { loginInfor: ILoginInfor }) => {
  const router = useRouter();
  const { pathname, locale } = router;

  const handleSwitchToBizUser = () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    userInfo.type = UsersTypes.BIZ_USER;
    localStorage.setItem("user", JSON.stringify(userInfo));
    const firstOwnedListingSlug = get(
      userInfo,
      "owner_listings[0].attributes.slug"
    );
    if (firstOwnedListingSlug) {
      router.push(`/biz/home/${firstOwnedListingSlug}/edit`);
      const url =
        `/${locale && locale !== "en" ? locale + "/" : ""}` +
        `biz/home/${firstOwnedListingSlug}/edit`;
      window.location.href = url;
      // router.push(`/biz/home/${get(userInfo, 'owner_listings[0].attributes.slug')}/edit`)
    } else {
      router.push("/claim");
    }
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
        <Popover content={<SwitchAccountsContent />} position="bottom-left">
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
