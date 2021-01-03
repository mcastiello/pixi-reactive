import React, { useEffect, useState } from 'react';
import CodeViewer from './CodeViewer';
import { StyledCode } from './PropsTable';
import { StyledIntroduction, StyledLink, StyledTitle } from './StyledComponents';

const EnumeratorList: React.FC<{ name: string; enumerator: any; src?: string }> = ({ name, enumerator, src }) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    const codeLines = Object.keys(enumerator)
      .filter((item) => !/^\d+$/.test(item))
      .map((item) => `const ${item.toLowerCase()} = ${name}.${item}; // ${enumerator[item]}`);
    setCode(`import { ${name} } from 'pixi-reactive';\n\n${codeLines.join('\n')}`);
  }, [name, enumerator]);

  return (
    <>
      <StyledTitle>{name} Enumerator</StyledTitle>
      {src && (
        <StyledIntroduction>
          You can find more information about <StyledCode>{name}</StyledCode> at the following{' '}
          <StyledLink href={src} text={'link'} external target={'_blank'} />.
        </StyledIntroduction>
      )}
      <CodeViewer>{code}</CodeViewer>
    </>
  );
};

export default EnumeratorList;
