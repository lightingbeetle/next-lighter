import React from "react";
import dynamic from "next/dynamic";
import { Styleguide } from "@lighting-beetle/lighter-styleguide";

type DesignSystemPageProps = {
  fileName?: string;
  children?: React.ReactNode;
  // routes: StyleguideProps['routes'];
  routes: object[];
  title?: string;
};

const DesignSystemPage = ({
  fileName,
  children,
  routes,
  title = "Default title",
}: DesignSystemPageProps) => {
  const MDXContent = fileName
    ? dynamic(
        () =>
          import(
            /* webpackInclude: /\.mdx$/ */
            `../../../../components/src/${fileName.slice(0, -4)}.mdx`
          )
      )
    : null;

  return (
    <Styleguide
      //@ts-ignore
      routes={routes}
      currentPage={title}
      logoSrc="/logo.svg"
      adminHref="/design-system/admin"
    >
      {children || <MDXContent />}
    </Styleguide>
  );
};

export default DesignSystemPage;
