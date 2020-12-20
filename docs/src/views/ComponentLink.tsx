import React, { useContext } from 'react';
import { DispatchContext, getComponentUrl, Pages } from '../pages';
import { StyledIndexLink } from './StyledComponents';

const ComponentLink: React.FC<{ page: Pages; className?: string }> = ({ page, className }) => {
  const { dispatch } = useContext(DispatchContext);

  return <StyledIndexLink className={className} href={`#${getComponentUrl(page)}`} key={page} text={page} onClick={() => dispatch(page)} />;
};

export default ComponentLink;
