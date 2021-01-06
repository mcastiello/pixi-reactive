import { Block } from 'framework7-react';
import React from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import { StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledLink, StyledTitle } from '../StyledComponents';

const TextureContextDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>TextureContext</StyledTitle>
      <StyledIntroduction>
        The <StyledCode>TextureContext</StyledCode> is mostly for internal use; when a list of sources is passed to the{' '}
        <ComponentLink page={Pages.PixiCanvas} /> <StyledCode>textures</StyledCode> property, those are downloaded by the{' '}
        <StyledCode>PIXI.Loader</StyledCode> and the resulting textures are stored in this context. In this way, all the sprite components
        can easily access them using their names.
        <br />
        The texture list can include any type of image files, but it also supports <StyledCode>JSON</StyledCode> files created using{' '}
        <StyledLink href={'https://www.codeandweb.com/texturepacker'} text={'TexturePacker'} external target={'_blank'} />. When you load a
        packed texture, the exploded textures will be associated with the names they have inside the <StyledCode>JSON</StyledCode> file
        (minus the extensions). The name used in the list will be associated with an array of texture names that can be used to load the
        frames as a <ComponentLink page={Pages.PixiAnimatedSprite} />.
        <br />
        It sounds a bit farfetched, but the following example should clarify it:
      </StyledIntroduction>
      <Block>
        Assuming this is the content of the <StyledCode>JSON</StyledCode> file
        <CodeViewer src={'./static/assets/colors.json'} />
        And this is the file list you are going to pass to the loader
        <CodeViewer src={'./static/assets/imports.json'} />
        The resulting <StyledCode>TextureContext</StyledCode> will be the following
        <CodeViewer>
          {'{\n' +
            '  textures: {\n' +
            '    galaxy: PIXI.Texture,\n' +
            '    ship: PIXI.Texture,\n' +
            '    blue: PIXI.Texture,\n' +
            '    green: PIXI.Texture,\n' +
            '    red: PIXI.Texture,\n' +
            "    colors: ['blue', 'green', 'red']\n" +
            '  }\n' +
            '  resources: {\n' +
            '    galaxy: PIXI.LoaderResource,\n' +
            '    ship: PIXI.LoaderResource,\n' +
            '    colors: PIXI.LoaderResource\n' +
            '  }\n' +
            '}'}
        </CodeViewer>
      </Block>
    </>
  );
};

export default TextureContextDoc;
