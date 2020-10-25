import { Language } from 'prism-react-renderer';
import useCodeHighlight from './useCodeHighlight';

type Code = {
  children: string;
  language: Language;
  inline: boolean;
};

const Code = ({
  children,
  language = 'markup',
  inline = true,
  ...other
}: Code) => {
  const { highlight } = useCodeHighlight({
    code: children,
    language,
    inline,
  });

  if (!children) {
    return null;
  }

  return highlight;
};

export default Code;
