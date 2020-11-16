import { MDXProvider, Components } from "@mdx-js/react";
import Link from "next/link";
import { Children } from "react";
import { H1, H2, H3, H4, H5, H6 } from "./components";
import { P } from "./components/Typography";

type StyleguideProps = {
  children: React.ReactNode;
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

const components: Components = {
  h1: props => <H1 id={`${createHeaderId(props)}`} {...props} />,
  h2: props => <H2 id={`${createHeaderId(props)}`} {...props} />,
  h3: props => <H3 id={`${createHeaderId(props)}`} {...props} />,
  h4: props => <H4 id={`${createHeaderId(props)}`} {...props} />,
  h5: props => <H5 id={`${createHeaderId(props)}`} {...props} />,
  h6: props => <H6 id={`${createHeaderId(props)}`} {...props} />,
  p: P,
  a: Link
};

const Styleguide = ({ children }: StyleguideProps) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default Styleguide;
