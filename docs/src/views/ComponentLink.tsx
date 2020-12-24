import React, { useContext, useEffect, useState } from 'react';
import { DispatchContext, getComponentUrl, Pages } from '../pages';
import { StyledIndexLink } from './StyledComponents';

const ComponentLink: React.FC<{ page: Pages; className?: string }> = ({ page, className }) => {
  const { dispatch } = useContext(DispatchContext);
  const [url, setUrl] = useState<string|undefined>();

  useEffect(() => {
    getComponentUrl(page).then(url => setUrl(`#${url}`))
  }, [page]);

  return <StyledIndexLink className={className} href={url} key={page} text={page} onClick={() => dispatch(page)} />;
};

export default ComponentLink;
