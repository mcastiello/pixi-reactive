import React from 'react';
import { Pages } from '../../pages';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const props: PropsDefinition = [
  ['align', false, 'TextAlign', 'TextAlign.Left', 'Text alignment'],
  ['breakWords', false, 'boolean', 'false', 'Whether or not to break a work when going to a new line'],
  ['dropShadow', false, 'boolean', 'false', 'Flag to add a drop shadow to the text'],
  ['dropShadowAlpha', false, 'number', '1', 'Alpha value of the drop shadow'],
  ['dropShadowAngle', false, 'number', 'Math.PI / 6', 'Angle of the drop shadow'],
  ['dropShadowBlur', false, 'number', '0', 'Blur amount of the drop shadow'],
  ['dropShadowColor', false, 'string', "'black'", 'Color of the drop shadow'],
  ['dropShadowDistance', false, 'number', '5', 'Distance from the text of the drop shadow'],
  ['fill', false, 'string', "'black'", 'Color used to fill the text'],
  ['fillGradientType', false, 'TextGradient', 'TextGradient.LinearHorizontal', 'Direction of the color gradient'],
  ['fillGradientStops', false, 'string[]', '[]', 'list of colors used to create a gradient to fill the text'],
  ['fontFamily', false, 'string', "'Arial'", 'Font family'],
  ['fontSize', false, 'number', '26', 'Font size in pixels'],
  ['fontStyle', false, 'FontStyle', 'FontStyle.Normal', 'Font style (check type for details)'],
  ['fontVariant', false, 'FontVariant', 'FontVariant.Normal', 'Font variant (check type for details)'],
  ['fontWeight', false, 'FontWeight', 'FontWeight.Normal', 'Font weight  (check type for details)'],
  ['leading', false, 'number', '0', 'The space between lines'],
  ['letterSpacing', false, 'number', '0', 'Amount of space added between letters'],
  ['lineHeight', false, 'number', '0', 'Height of each line'],
  ['lineJoin', false, 'LineJoin', 'LineJoin.Miter', 'Shape to be used at the corners of the text path'],
  ['miterLimit', false, 'number', '10', 'Limit of the miter shape'],
  ['padding', false, 'number', '0', 'padding of the text from the borders'],
  ['stroke', false, 'string', "'black'", 'Color used to stroke the borders of the text'],
  ['strokeThickness', false, 'number', '0', 'Thickness of the text borders'],
  ['textBaseline', false, 'TextBaseline', 'TextBaseline.Alphabetic', 'Type of text baseline alignment'],
  ['trim', false, 'boolean', 'false', 'Trim the edges of the resulting texture'],
  ['whiteSpace', false, 'TextWhiteLine', 'TextWhiteLine.Pre', 'Determines whether newlines and spaces are collapsed or preserved'],
  ['wordWrap', false, 'boolean', 'false', 'Whether to go or not to a new line when the `wordWrapWidth` is reached'],
  ['wordWrapWidth', false, 'number', '100', 'Size after which the text needs to go to a newline']
];
const TextStyleDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>TextStyle</StyledTitle>
      <StyledIntroduction>
        Style used by the <ComponentLink page={Pages.PixiText} /> component to draw the text.
      </StyledIntroduction>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default TextStyleDoc;
