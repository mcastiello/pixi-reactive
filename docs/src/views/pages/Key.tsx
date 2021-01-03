import React from 'react';
import { Pages } from '../../pages';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition, StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const props: PropsDefinition = [
  ['key', true, 'string', 'null', 'The character key code'],
  ['alt', false, 'boolean', 'null', 'Flag that requires the character to be pressed together with the `Alt` key'],
  ['control', false, 'boolean', 'null', 'Flag that requires the character to be pressed together with the `Control` key'],
  ['shift', false, 'boolean', 'null', 'Flag that requires the character to be pressed together with the `Shift` key']
];
const KeyDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>Key</StyledTitle>
      <StyledIntroduction>
        The Key type can be used with the <ComponentLink page={Pages.UseKeyboard} /> hook and can identify a <StyledCode>string</StyledCode>{' '}
        or an object with the following properties.
      </StyledIntroduction>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
      <StyledIntroduction>
        The <ComponentLink page={Pages.SpecialKeys} /> contains a set of strings that identify the most used key values on a keyboard.
      </StyledIntroduction>
    </>
  );
};

export default KeyDoc;
