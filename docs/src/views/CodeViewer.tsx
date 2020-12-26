import React, { ReactText, useEffect, useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('tsx', tsx);

const CodeViewer: React.FC<{src?: string, children?: ReactText}> = ({ src, children = '' }) => {
  const [code, setCode] = useState(children);

  useEffect(() => {
    if (src) {
      fetch(src).then(response => response.text()).then(text => setCode(text));
    }
  }, [src]);

  useEffect(() => {
    if (children) {
      setCode(children);
    }
  }, [children]);

  return (
    // @ts-ignore
    <SyntaxHighlighter style={darcula} language={'tsx'} showLineNumbers>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeViewer;
