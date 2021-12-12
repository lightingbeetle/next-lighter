import React from "react";
import "modern-normalize/modern-normalize.css";
import "components/index.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
