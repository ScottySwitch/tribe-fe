import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import AuthPopup from "components/AuthPopup/AuthPopup";

import Footer from "components/Footer/Footer";
import Header from "components/TheHeader/Header";
import HamModal from "components/HamModal/HamModal";

import styles from "styles/App.module.scss";
import "../styles/globals.css";
import ContributeTabBar from "components/ContributeTabBar/ContributeTabBar";

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
    "/biz/verify",
  ];
  const isAuthPage = !notAuthPages.includes(pathname);

  const [isLoggedIn, setILoggedIn] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showHamModal, setShowHamModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  //handle logic hide header when scroll, not hide when in desktop || when opening ham modal || in unAuthPages
  useEffect(() => {
    var prevScrollpos = window.pageYOffset;
    const header = document.getElementById("header") as any;

    const handleScroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos < currentScrollPos && !showHamModal && isAuthPage) {
        header.style.top = "-120px";
      } else {
        header.style.top = "0";
      }
      prevScrollpos = currentScrollPos;
    };

    if (header && isMobile) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [showHamModal, isMobile, isAuthPage]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (screen.width < 501) {
      setIsMobile(true);
    }

    const token = localStorage.getItem("access_token");
    if (token) {
      setILoggedIn(true);
      setShowAuthPopup(false);
    } else {
      setILoggedIn(false);
      setShowAuthPopup(true);
    }
  }, []);

  return (
    <div className={styles.app}>
      {!showHamModal && (
        <Header
          id="header"
          isLoggedIn={isLoggedIn}
          onOpenHamModal={() => setShowHamModal(!showHamModal)}
        />
      )}
      <Component {...pageProps} />
      <AuthPopup
        onClose={() => setShowAuthPopup(false)}
        visible={isAuthPage && showAuthPopup && !isLoggedIn}
      />
      <HamModal
        isLoggedIn={isLoggedIn}
        showHamModal={showHamModal}
        onSetShowHamModal={(e: boolean) => setShowHamModal(e)}
      />
      <Footer visible={isAuthPage} backgroundColor={pathname !== "/biz/information"} />

      <ContributeTabBar visible={!showHamModal && isAuthPage && isMobile} />
    </div>
  );
}

export default MyApp;
