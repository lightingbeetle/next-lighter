import { MDXProvider, Components } from "@mdx-js/react";
import React, { useMemo } from "react";
import StyleguideContext, {
  StyleguideContextType
} from "./useStyleguideContext";

import Sidebar from "./Sidebar";
import Header from "../Header";
import Main from "./Main";
import Page from "./Page";
import defaultComponents from "./defaultMDXComponents";

type StyleguideProps = {
  components?: Components;
  customUI?: React.ReactNode;
} & Partial<StyleguideContextType>;

const Styleguide = ({
  children,
  routes,
  components: componentsProp,
  customUI,
  logoSrc = "logo.svg",
  logoHref = "/",
  logoAlt = "Lighter",
  currentPage,
  adminHref
}: StyleguideProps) => {
  const components = { ...defaultComponents, ...componentsProp };

  const value = useMemo(
    () => ({
      children,
      routes,
      logoSrc,
      logoHref,
      logoAlt,
      currentPage,
      adminHref
    }),
    [children, routes, logoSrc, logoHref, logoAlt, currentPage, adminHref]
  );

  return (
    <StyleguideContext.Provider value={value}>
      <MDXProvider components={components}>
        {customUI ? (
          customUI
        ) : (
          <>
            <Header />
            <Page>
              <Sidebar />
              <Main />
            </Page>
          </>
        )}
      </MDXProvider>
    </StyleguideContext.Provider>
  );
};

export default Styleguide;
