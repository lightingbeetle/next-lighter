import React from "react";
import DesignSystemPage from "../components/DesignSystemPage";
import { getDesignSystemRoutes } from "../utils/getDesignSystemRoutes";
import { Preview } from "@lighting-beetle/lighter-styleguide";
import { Button } from "components";

function Index({ routes }) {
  return (
    <DesignSystemPage title="Design system" routes={routes}>
      <h1>Design system</h1>
      <Button>haha</Button>
      <Preview>lol</Preview>
    </DesignSystemPage>
  );
}

export async function getStaticProps() {
  const routes = getDesignSystemRoutes();

  return {
    props: {
      routes,
    },
  };
}

export default Index;
