import classNames from "classnames";
import Icon from "components/Icon/Icon";
import { loginInforItem, user, userId, token } from "constant";
import { useRouter } from "next/router";
import { ILoginInfor } from "pages/_app";
import { UserInforContext } from "Context/UserInforContext";
import { useContext } from "react";
import { ProfileTabs } from "enums";
import styles from "./Menu.module.scss";

interface MenuMenuProps {
  loginInfor: ILoginInfor;
  mobile?: boolean;
  onShowCategoriesModal?: () => void;
  onShowAuthPopup?: () => void;
  onShowHamModal?: () => void;
}

const Menu = (props: MenuMenuProps) => {
  const {
    loginInfor = {},
    mobile,
    onShowCategoriesModal,
    onShowAuthPopup,
    onShowHamModal,
  } = props;
  const router = useRouter();
  const { user } = useContext(UserInforContext);
  const { location } = user;

  const checkLogin = (href: string) => {
    onShowHamModal?.();
    user && user.token ? router.push(`/profile/${href}`) : onShowAuthPopup?.()
    onShowAuthPopup?.();
  };

  const menuItems = [
    // {
    //   icon: "categories-color",
    //   label: "Categories",
    //   onClick: onShowCategoriesModal,
    // },
    {
      icon: "deal",
      label: "Saved deals",
      onClick: () => checkLogin(ProfileTabs.SAVED_DEALS),
    },
    {
      icon: "heart-color",
      label: "Favorited",
      borderBottom: true,
      onClick: () => checkLogin(ProfileTabs.FAVOURITED),
    },
    {
      icon: "comment-color",
      label: "Edit profile",
      onClick: () => checkLogin(ProfileTabs.ABOUT),
    },
    // { icon: "settings-color", label: "Settings", borderBottom: true },
    // { icon: "like-color-2", label: "Referral code" },
    {
      icon: "business",
      label: "Tribes for Businesses",
      onClick: () => router.push("/claim"),
    },
    {
      icon: "support-color",
      label: "Support",
      onClick: () => router.push("/support"),
    },
    // { icon: "eng-flag", label: "Languages" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("user");
    router.push("/");
    router.reload();
  };

  return (
    <>
      {menuItems.map((item) => {
        const menuItemClassName = classNames(styles.menu_item, {
          [styles.border_bottom]: mobile && item.borderBottom,
        });
        return (
          <div
            key={item.label}
            className={menuItemClassName}
            onClick={() => item.onClick?.()}
          >
            <Icon icon={item.icon} size={20} />
            <div>{item.label}</div>
          </div>
        );
      })}
      {!!loginInfor.token && (
        <div onClick={handleLogout} className={styles.logout}>
          <Icon icon="log-out" size={20} color="#e60112" />
          <div>Logout</div>
        </div>
      )}
    </>
  );
};

export default Menu;
