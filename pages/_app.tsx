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
  ];
  const isAuthPage = !notAuthPages.includes(pathname);

  const [isLoggedIn, setILoggedIn] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showHamModal, setShowHamModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (screen.width < 501) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    var prevScrollpos = window.pageYOffset;

    const handleScroll = function () {
      var currentScrollPos = window.pageYOffset;
      const header = document.getElementById("header") as any;
      if (prevScrollpos < currentScrollPos && !showHamModal) {
        header.style.top = "-120px";
      } else {
        header.style.top = "0";
      }
      prevScrollpos = currentScrollPos;
    };

    if (isMobile) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [showHamModal, isMobile]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    
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
      <Header
        id="header"
        isLoggedIn={isLoggedIn}
        onOpenHamMenu={() => setShowHamModal(!showHamModal)}
      />
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
      <Footer visible={isAuthPage} />
      <ContributeTabBar visible={isAuthPage && isLoggedIn && isMobile} />
    </div>
  );
}

export default MyApp;
