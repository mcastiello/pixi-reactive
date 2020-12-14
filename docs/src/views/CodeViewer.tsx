import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('tsx', tsx);

const CodeViewer: React.FC = ({ children }) => {
  return (
    // @ts-ignore
    <SyntaxHighlighter style={darcula} language={'tsx'} showLineNumbers>
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeViewer;
