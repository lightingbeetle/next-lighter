import React from "react";
import "modern-normalize/modern-normalize.css";
import "components/styles.scss";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
