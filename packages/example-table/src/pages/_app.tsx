import React from "react";
import { NextAdapter } from "next-query-params";
import { QueryParamProvider } from "use-query-params";
import "../components/Flats/filters/styles/style.scss";
import "components/styles.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <QueryParamProvider
      adapter={NextAdapter}
      options={{ removeDefaultsFromUrl: true }}
    >
      <Component {...pageProps} />
    </QueryParamProvider>
  );
}
