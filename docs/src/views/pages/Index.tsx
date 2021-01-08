import { Block } from 'framework7-react';
import React from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PageIndex from '../PageIndex';
import { StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledLink, StyledSectionTitle } from '../StyledComponents';
import { PixiCanvasExample } from './PixiCanvas';

const Index: React.FC = () => {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <img src={'./static/assets/pixi-reactive.png'} alt={'Pixi Reactive'} />
      </div>
      <StyledIntroduction>
        The <StyledCode>PixiReactive</StyledCode> library is a quick way to use all the features provided by{' '}
        <StyledLink href={'http://pixijs.download/release/docs/index.html'} text={'PIXI'} external target={'_blank'} /> inside a{' '}
        <StyledLink href={'https://reactjs.org/'} text={'React'} external target={'_blank'} /> virtual DOM. The ultimate goal is to
        encapsulate all the PIXI elements inside React Function Components that can be easily added to your project. As a matter of fact, in
        most use cases, you may never need to instantiate a PIXI object yourself. You won't need to load a renderer or worry about the
        animation loop and the page resize. You just need to add a <ComponentLink page={Pages.PixiCanvas} /> to your component and start
        coding your game or animation.
        <br />
        You will also be able to mix HTML content with PIXI objects... I mean, you may never need it, but it's there...
      </StyledIntroduction>
      <StyledSectionTitle>Installation</StyledSectionTitle>
      <StyledIntroduction>
        This library uses both <StyledCode>React</StyledCode> and <StyledCode>PIXI</StyledCode> as peer dependencies, which basically means
        that they are required, but they are not automatically imported, so that you can use your own versions and you won't have duplicates
        among your node modules. So, depending on your favourite package manager, you will need to install all the 3 libraries as follows:{' '}
        <Block>
          <StyledCode>npm install react pixi.js pixi-reactive</StyledCode>
          <br />
          or
          <br />
          <StyledCode>yarn add react pixi.js pixi-reactive</StyledCode>
        </Block>
        Or you can fork and build your own version from{' '}
        <StyledLink href={'https://github.com/mcastiello/pixi-reactive'} text={'GitHub'} external target={'_blank'} />.
      </StyledIntroduction>
      <StyledSectionTitle>Usage</StyledSectionTitle>
      <StyledIntroduction>
        <CodeViewer src={'./static/examples/PixiCanvasExample.tsx'} />
      </StyledIntroduction>
      <Block style={{ height: 300 }}>
        <PixiCanvasExample />
      </Block>
      <StyledSectionTitle>Documentation</StyledSectionTitle>
      <StyledIntroduction>
        Please have a look through the following sections to learn all you need to know about the library:
        <br />
        <br />
        <PageIndex page={Pages.Index} showTitle={false} />
      </StyledIntroduction>
      <StyledSectionTitle>Coming next</StyledSectionTitle>
      <StyledIntroduction>
        The following are a few things I'm going to add in the next few releases (in order of priority).
        <ul>
          <li>
            <StyledCode>PixiSpine</StyledCode> - Another external plugin, this one is going to integrate support for the{' '}
            <StyledLink href={'https://github.com/pixijs/pixi-spine'} text={'Spine Runtime'} external target={'_blank'} />.
          </li>
        </ul>
      </StyledIntroduction>
      <StyledSectionTitle>Contacts and Issues</StyledSectionTitle>
      <StyledIntroduction>
        Feel free to contact me and open issues on the project{' '}
        <StyledLink href={'https://github.com/mcastiello/pixi-reactive'} text={'GitHub'} external target={'_blank'} /> page.
      </StyledIntroduction>
    </>
  );
};

export default Index;
