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
import { UserType } from "enums";

import styles from "./Header.module.scss";
import AuthApi from "services/auth";
import bizListingApi from "services/biz-listing";
import { UserInforContext } from "Context/UserInforContext";
import { isArray } from "lodash";
import Modal from "components/Modal/Modal";
import classNames from "classnames";
import { route } from "next/dist/server/router";

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
  const router = useRouter();
  const { user, updateUser } = useContext(UserInforContext);

  const ownerListing = isArray(get(user, "owner_listings"))
    ? get(user, "owner_listings").map((item) => item.attributes)
    : [];

  const { query } = router;
  const { listingSlug } = query;

  const handleSwitchToNormalUser = async () => {
    updateUser({
      avatar: user.user_avatar,
      current_listing_slug: undefined,
      user_type: UserType.NORMAL_USER,
    });
    router.push("/");
  };

  const handleSwitchListing = async (item) => {
    updateUser({
      avatar: get(item, "logo[0]"),
      current_listing_slug: get(item, "slug"),
      user_type: UserType.BIZ_USER,
    });
    router.push(`/biz/home/${item.slug}/edit`);
  };

  return (
    <React.Fragment>
      {ownerListing.map((item) => (
        <div
          key={item.name}
          className={`${styles.wrapper_content} flex gap-3 cursor-pointer`}
          onClick={() => handleSwitchListing(item)}
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
          src={user.user_avatar || require("public/images/avatar.png")}
          alt=""
          width={30}
          height={30}
          style={{ borderRadius: "50%" }}
        />
        <div>
          <strong>
            {user.first_name} {user.last_name}
          </strong>
          <p className="text-xs">User account</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export const UserInfor = ({ loginInfor = {} }: { loginInfor: ILoginInfor }) => {
  const router = useRouter();
  const { user, updateUser } = useContext(UserInforContext);
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  const handleSwitchToBizUser = () => {
    const hasOwnedListings = get(user, "owner_listings.length") > 0;
    if (hasOwnedListings) {
      return true;
    } else {
      router.push("/claim");
      return false;
    }
  };

  return (
    <>
      <div
        className={classNames(styles.gadget_group, {
          [styles.hide]: !(
            user.token && user.user_type === UserType.NORMAL_USER
          ),
        })}
      >
        <Popover
          content={<SwitchAccountsContent />}
          position="bottom-left"
          onBeforePopUp={handleSwitchToBizUser}
        >
          <div className="flex gap-2 items-center w-max">
            <Icon icon="business" size={20} />
            Business
          </div>
        </Popover>
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
            src={user.avatar || require("public/images/avatar.png")}
            alt=""
            width={40}
            height={40}
            className={styles.avatar}
          />
        </Popover>
        <Modal
          title="Switch account"
          width={600}
          visible={showSwitchModal}
          mobilePosition="center"
          onClose={() => setShowSwitchModal(false)}
        >
          <div className="p-[30px] pt-0 flex flex-col gap-5">
            <SwitchAccountsContent />
          </div>
        </Modal>
      </div>
      <div
        className={classNames(styles.gadget_group, {
          [styles.hide]: !(user.token && user.user_type === UserType.BIZ_USER),
        })}
      >
        <Popover content={<SwitchAccountsContent />} position="bottom-left">
          <div className="flex gap-2 items-center w-max">
            <Icon icon="user-color" size={20} />
            Switch accounts
          </div>
        </Popover>
        <Image
          src={user.avatar || require("public/images/page-avatar.png")}
          alt=""
          width={40}
          height={40}
          onClick={() =>
            router.push(`/biz/information/${user.current_listing_slug}`)
          }
          className={`${styles.avatar} cursor-pointer`}
        />
      </div>
      <div
        className={classNames(styles.gadget_group, {
          [styles.hide]: user.token,
        })}
      >
        <Button
          text="Sign up"
          variant="outlined"
          onClick={() => router.push("/signup")}
        />
        <Button text="Login" onClick={() => router.push("/login")} />
      </div>
    </>
  );
};
