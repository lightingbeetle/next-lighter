import { Language } from "prism-react-renderer";
import useCodeHighlight from "./useCodeHighlight";

type CodeProps = {
  children: string;
  language: Language;
  inline: boolean;
};

const Code = ({
  children,
  language = "markup",
  inline = true,
  ...other
}: CodeProps) => {
  const { highlight } = useCodeHighlight({
    code: children,
    language,
    inline
  });

  if (!children) {
    return null;
  }

  return highlight;
};

export default Code;
