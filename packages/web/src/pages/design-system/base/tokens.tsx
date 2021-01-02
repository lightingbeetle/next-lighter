import fs from "fs";
import path from "path";
import matter from "gray-matter";
import DesignSystemPage from "../../../components/DesignSystemPage";
import { getDesignSystemRoutes } from "../../../utils/getDesignSystemRoutes";

const TokensPage = ({ filename, routes, title }) => {
  return <DesignSystemPage routes={routes} fileName={filename} title={title} />;
};

export async function getStaticProps({ params }) {
  const routes = getDesignSystemRoutes();

  const filename = path.join("tokens", "tokens.docs.mdx");

  const mdxPost = fs
    .readFileSync(path.join(process.cwd(), "..", "components", "src", filename))
    .toString();

  const { data } = matter(mdxPost);

  return {
    props: {
      filename,
      title: data.title ?? "Default title",
      routes,
    },
  };
}

export default TokensPage;
