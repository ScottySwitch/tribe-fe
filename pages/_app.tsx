import "../styles/globals.css";

import type { AppProps } from "next/app";
import Header from "components/Header/Header";
import AuthPopup from "components/AuthPopup/AuthPopup";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [showAuthPopup, setShowPopup] = useState(true);
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      {showAuthPopup && <AuthPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default MyApp;
