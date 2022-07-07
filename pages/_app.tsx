import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import AuthPopup from "components/AuthPopup/AuthPopup";
import Footer from "components/Footer/Footer";
import Header from "components/TheHeader/Header";
import HamModal from "components/HamModal/HamModal";
import BizApi from "services/biz-listing";
import ContributeTabBar from "components/ContributeTabBar/ContributeTabBar";
import { Tiers, UsersTypes } from "enums";
import AuthApi from "../services/auth";
import { IUser, UserInforContext } from "Context/UserInforContext";

import styles from "styles/App.module.scss";
import "../styles/globals.css";

export type ILoginInfor = {
  token?: string;
  type?: UsersTypes;
  tier?: Tiers;
  avatar?: string;
};

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
  const defaultUserInformation: { [key: string]: any } = {
    token: undefined,
    avatar: undefined,
  };

  const [loginInfor, setLoginInfo] = useState<ILoginInfor>({});
  const [user, setUser] = useState<IUser>(defaultUserInformation);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showHamModal, setShowHamModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const stringyLoginInfo = localStorage.getItem("user");
    const localLoginInfo = stringyLoginInfo ? JSON.parse(stringyLoginInfo) : {};
    if (localLoginInfo.token) {
      setLoginInfo(localLoginInfo);
      setShowAuthPopup(false);
    } else {
      setLoginInfo({});
      setShowAuthPopup(true);
    }
  }, []);

  //handle logic hide header when scroll, not hide when in desktop || when setShowOpenHoursModal ham modal || in unAuthPages
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
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    const getMe = async () => {
      await AuthApi.getMe();
      if (userInfo) {
        const dataOwnerListing = await BizApi.getOwnerBizListing(userInfo.id);
        // const dataBizlisting = await BizApi.getBizListingByUserId(userInfo.id)
        // const dataBizInvoice = await BizInvoice.getBizInvoiceByUserId(userInfo.id)
        // const dataClaimListing = await ClaimListingApi.getClaimListingByUserId(userInfo.id)
        // const dataListingRoles = await BizApi.getOwnerListingRoleByUserId(userInfo.id)
        userInfo = {
          ...userInfo,
          // // biz_listings: dataBizlisting.data.data,
          // biz_invoice: dataBizInvoice.data.data,
          // claim_listings: dataClaimListing.data.data,
          // listing_roles: dataListingRoles.data.data,
          owner_listings: dataOwnerListing.data.data,
        };
      }
      localStorage.setItem("user", JSON.stringify(userInfo));
    };
    if (userInfo.token) {
      getMe().catch((e) => console.log(e));
    }

    if (screen.width < 501) {
      setIsMobile(true);
    }
  }, [router]);

  const contextDefaultValue = {
    user: user,
    deleteUser: () => setUser({}),
    updateUser: (infor) => {
      setUser({ ...user, ...infor });
    },
  };

  return (
    <UserInforContext.Provider value={contextDefaultValue}>
      <UserInforContext.Consumer>
        {({ user, updateUser, deleteUser }) => (
          <div className={styles.app}>
            <Header
              id="header"
              loginInfor={loginInfor}
              onOpenHamModal={() => setShowHamModal(!showHamModal)}
            />
            <Component
              user={user}
              updateUser={updateUser}
              deleteUser={deleteUser}
              {...pageProps}
            />
            <AuthPopup
              onClose={() => setShowAuthPopup(false)}
              visible={isAuthPage && showAuthPopup && !loginInfor.token}
            />
            <HamModal
              loginInfor={loginInfor}
              showHamModal={showHamModal}
              onSetShowHamModal={(e: boolean) => setShowHamModal(e)}
            />
            <Footer
              visible={isAuthPage}
              backgroundColor={pathname !== "/biz/information"}
            />
            <ContributeTabBar
              visible={!showHamModal && isAuthPage && isMobile}
            />
          </div>
        )}
      </UserInforContext.Consumer>
    </UserInforContext.Provider>
  );
}

export default MyApp;
