import "../styles/globals.css";

import type { AppProps } from "next/app";
import Header from "components/Header/Header";
import AuthPopup from "components/AuthPopup/AuthPopup";
import { useState } from "react";
import Modal from "components/Modal/Modal";

function MyApp({ Component, pageProps }: AppProps) {
  const [showAuthPopup, setShowPopup] = useState(true);
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Modal
        transparent
        visible={showAuthPopup}
        onClose={() => setShowPopup(false)}
      >
        <AuthPopup onClose={() => setShowPopup(false)} />
      </Modal>
    </>
  );
}

export default MyApp;
