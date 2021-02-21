import DesignSystemPage from "../../components/DesignSystemPage";
import { getDesignSystemRoutes } from "../../utils/getDesignSystemRoutes";

function Index({ routes }) {
  return (
    <DesignSystemPage title="Design system" routes={routes}>
      <h1>Design system</h1>
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
