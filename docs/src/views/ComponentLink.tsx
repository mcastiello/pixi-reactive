import React, { useEffect, useState } from 'react';
import { getComponentUrl, Pages } from '../pages';
import { StyledComponentLink } from './StyledComponents';

const ComponentLink: React.FC<{ page: Pages; className?: string }> = ({ page, className }) => {
  const [url, setUrl] = useState<string | undefined>();

  useEffect(() => {
    getComponentUrl(page).then((url) => setUrl(`#${url}`));
  }, [page]);

  return <StyledComponentLink className={className} href={url} key={page} text={page} external />;
};

export default ComponentLink;
