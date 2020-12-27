import { Block } from 'framework7-react';
import React from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import { StyledIntroduction, StyledTitle } from '../StyledComponents';

const TextureContextDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>TextureContext</StyledTitle>
      <StyledIntroduction>
        This type define the format accepted by the texture loader. It is basically an object where the keys are the names you want to give
        to the textures and the values are the path to the actual resource. For more information, please refer to the{' '}
        <ComponentLink page={Pages.TextureContext} /> page.
        <br />
        The following is a valid example of an object that can be used to load resources:
      </StyledIntroduction>
      <Block>
        <CodeViewer src={'./static/assets/imports.json'} />
      </Block>
    </>
  );
};

export default TextureContextDoc;
