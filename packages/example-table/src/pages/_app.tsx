import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import micromatch from "micromatch";
import "modern-normalize/modern-normalize.css";
import customPages from "../custom-pages";
import "../components/Flats/styles/style.scss";
import "../components/Flats/filters/styles/style.scss";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Reload page when we hit static page. Otherviews React document will stay on static page. Reload of the page fixis it because we will get document with StaticHead and StaticScripts.
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (micromatch.isMatch(url, Object.keys(customPages))) {
        router.reload();
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}
