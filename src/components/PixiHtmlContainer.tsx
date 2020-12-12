import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { ParentContext } from '../contexts';

const PixiHtmlContainer: React.FC<{ id?: string }> = ({ id, children }) => {
  const { left, top, transform, width, height, parent } = useContext(ParentContext);
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const newStyle: CSSProperties = {
      display: 'inline-block',
      position: 'absolute',
      transform: `matrix(${transform.join(',')})`,
      width,
      height,
      top,
      left
    };

    setStyle(newStyle);
  }, [transform, width, height, left, top]);

  return (
    <div id={id} className={parent.name} style={style}>
      {children}
    </div>
  );
};

export default PixiHtmlContainer;
