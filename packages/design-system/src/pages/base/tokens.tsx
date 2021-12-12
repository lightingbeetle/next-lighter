import React from "react";
import DesignSystemPage from "../../components/DesignSystemPage";
import { getDesignSystemRoutes } from "../../utils/getDesignSystemRoutes";
// @ts-ignore
import TokensDocs from "components/tokens/tokens.docs.mdx";

const TokensPage = ({ routes, title }) => {
  return (
    <DesignSystemPage routes={routes} title={title}>
      <TokensDocs />
    </DesignSystemPage>
  );
};

export async function getStaticProps() {
  const routes = getDesignSystemRoutes();

  return {
    props: {
      title: "Tokens",
      routes,
    },
  };
}

export default TokensPage;
