import { useState } from "react";

import type { AppProps } from "next/app";
import Header from "components/Header/Header";
import AuthPopup from "components/AuthPopup/AuthPopup";

import "../styles/globals.css";
import Footer from "components/Footer/Footer";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = router.pathname;
  const notAuthPages = ["/login", "/signup", "/forgot-password"];
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
