import { useRouter } from "next/router";
import { useState } from "react";

import type { AppProps } from "next/app";
import AuthPopup from "components/AuthPopup/AuthPopup";

import "../styles/globals.css";
import Footer from "components/Footer/Footer";
import Header from "components/TheHeader/Header";

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

  return (
    <div>
      <Header isAuthPage={isAuthPage} />
      <Component {...pageProps} />
      <AuthPopup onClose={() => setShowPopup(false)} visible={showAuthPopup} />
      {isAuthPage && <Footer />}
    </div>
  );
}

export default MyApp;
