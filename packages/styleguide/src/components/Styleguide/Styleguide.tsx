import { MDXProvider, Components } from "@mdx-js/react";
import Link from "next/link";
import { Children } from "react";
import styled from "styled-components";
import { Code, H1, H2, H3, H4, H5, H6 } from "..";
import { P } from "../Typography";
import Sidebar from "./Sidebar";

type StyleguideProps = {
  children: React.ReactNode;
  components?: Components;
  sidebarArea?: React.ReactNode;
};

/**
 * Create custom header id which can be used as hash in link
 * skips any react element in string and uses just strings
 * id contains only lowercase characters ("\w") numbers ("\d") and dashes ("-") for separation
 * Example: Hello 1 - anchor element, all you need
 * Turns into: hello-1-anchor-element-all-you-need
 */
const createHeaderId = props => {
  const childrenArr = Children.toArray(props.children);
  const text = childrenArr.reduce(
    (acc, cur) => (typeof cur === "string" ? acc + cur : acc),
    ""
  );
  return `${text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w\d]+/g, "-")}`;
};

const defaultComponents: Components = {
  h1: props => <H1 id={`${createHeaderId(props)}`} {...props} />,
  h2: props => <H2 id={`${createHeaderId(props)}`} {...props} />,
  h3: props => <H3 id={`${createHeaderId(props)}`} {...props} />,
  h4: props => <H4 id={`${createHeaderId(props)}`} {...props} />,
  h5: props => <H5 id={`${createHeaderId(props)}`} {...props} />,
  h6: props => <H6 id={`${createHeaderId(props)}`} {...props} />,
  p: P,
  a: Link,
  inlineCode: Code,
  code: props => (
    <Code
      inline={false}
      language={props.className?.replace(/language-/, "")}
      {...props}
    />
  )
};

const Page = styled.div`
  display: flex;
`;

const Main = styled.main`
  flex: 1 1 auto;
`;

const Styleguide = ({
  children,
  components: componentsProp,
  sidebarArea
}: StyleguideProps) => {
  const components = { ...defaultComponents, ...componentsProp };

  return (
    <MDXProvider components={components}>
      <Page>
        {sidebarArea && <Sidebar>{sidebarArea}</Sidebar>}
        <Main>{children}</Main>
      </Page>
    </MDXProvider>
  );
};

export default Styleguide;
