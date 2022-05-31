import { useRouter } from "next/router";
import { useState } from "react";

import type { AppProps } from "next/app";
import AuthPopup from "components/AuthPopup/AuthPopup";

import "../styles/globals.css";
import Footer from "components/Footer/Footer";
import Header from "components/TheHeader/Header";
import Modal from "components/Modal/Modal";
import Icon from "components/Icon/Icon";

import styles from "styles/App.module.scss";
import Button from "components/Button/Button";
import classNames from "classnames";

function MyApp({ Component, pageProps }: AppProps) {
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
  ];
  const isAuthPage = !notAuthPages.includes(pathname);
  const [showAuthPopup, setShowPopup] = useState(isAuthPage);
  const [showHamMenu, setShowHamMenu] = useState(false);

  const hamItems = [
    { icon: "categories-color", label: "Categories" },
    { icon: "categories-color", label: "Saved deals" },
    { icon: "heart-color", label: "Favorited", borderBottom: true },
    { icon: "comment-color", label: "Edit profile" },
    { icon: "settings-color", label: "Settings", borderBottom: true },
    { icon: "like-color-2", label: "Referral code" },
    { icon: "business", label: "Tribes for Businesses" },
    { icon: "support-color", label: "Support" },
    { icon: "eng-flag", label: "Languages" },
    // { icon: "eng-flag", label: "Log out", red: true },
  ];

  const gotoLogin = () => {
    setShowHamMenu(false);
    router.push("/login");
  };

  const gotoSignup = () => {
    setShowHamMenu(false);
    router.push("/signup");
  };

  return (
    <div className={styles.app}>
      <Header
        isAuthPage={isAuthPage}
        onOpenHamMenu={() => setShowHamMenu(!showHamMenu)}
      />
      <Component {...pageProps} />
      <AuthPopup onClose={() => setShowPopup(false)} visible={showAuthPopup} />
      <Modal
        visible={showHamMenu}
        mobileFullHeight
        mobilePosition="right"
        onClose={() => {
          setShowHamMenu(false);
        }}
      >
        <div className={styles.banner} />
        <div className={styles.ham_modal}>
          <div className={styles.button_container}>
            <Button text="Sign up" variant="outlined" onClick={gotoSignup} />
            <Button text="Login" onClick={gotoLogin} />
          </div>
          {hamItems.map((item) => {
            const itemClassName = classNames(styles.ham_modal_item, {
              [styles.border_bottom]: item.borderBottom,
              // [styles.red]: item.red,
            });
            return (
              <div key={item.label} className={itemClassName}>
                <Icon icon={item.icon} size={20} />
                <div>{item.label}</div>
              </div>
            );
          })}
        </div>
      </Modal>
      {isAuthPage && <Footer />}
    </div>
  );
}

export default MyApp;
