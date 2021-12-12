import React from "react";
import { Styleguide } from "@lighting-beetle/lighter-styleguide";

type DesignSystemPageProps = {
  fileName?: string;
  children?: React.ReactNode;
  // routes: StyleguideProps['routes'];
  routes: object[];
  title?: string;
  content?: any;
};

const DesignSystemPage = ({
  children,
  routes,
  title = "Default title",
}: DesignSystemPageProps) => {
  return (
    <Styleguide
      //@ts-ignore
      routes={routes}
      currentPage={title}
      logoSrc="/logo.svg"
      adminHref="/admin"
    >
      {children}
    </Styleguide>
  );
};

export default DesignSystemPage;
