import React from "react";
import { NextQueryParamProvider } from "next-query-params";
import "modern-normalize/modern-normalize.css";
import "../components/Flats/filters/styles/style.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <NextQueryParamProvider>
      <Component {...pageProps} />
    </NextQueryParamProvider>
  );
}
