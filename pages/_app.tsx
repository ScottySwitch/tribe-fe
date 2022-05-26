import { useState } from "react";

import type { AppProps } from "next/app";
import Header from "components/Header/Header";
import AuthPopup from "components/AuthPopup/AuthPopup";

import "../styles/globals.css";
import Footer from "components/Footer/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const [showAuthPopup, setShowPopup] = useState(true);
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <AuthPopup onClose={() => setShowPopup(false)} visible={showAuthPopup} />
      <Footer />
    </>
  );
}

export default MyApp;
