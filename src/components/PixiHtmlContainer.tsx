import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { ParentContext } from '../contexts';
import { PixiHtmlContainerProps } from '../props/PixiHtmlContainerProps';
import { Overflow } from '../types';

const PixiHtmlContainer: React.FC<PixiHtmlContainerProps> = ({ id, overflow = Overflow.All, children }) => {
  const { left, top, transform, width, height, parent } = useContext(ParentContext);
  const [style, setStyle] = useState<CSSProperties>({});
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (transform) {
      const newStyle: CSSProperties = {
        display: 'inline-block',
        position: 'absolute',
        transform: `matrix(${transform.join(',')})`,
        width,
        height,
        top,
        left
      };

      switch (overflow) {
        case Overflow.Horizontal:
          newStyle.overflowY = 'hidden';
          break;
        case Overflow.Vertical:
          newStyle.overflowX = 'hidden';
          break;
        case Overflow.None:
          newStyle.overflow = 'hidden';
      }

      setStyle(newStyle);
    }
  }, [transform, width, height, left, top, overflow]);

  useEffect(() => {
    setActive(!!transform && !!parent.parent && width > 1 && height > 1);
  }, [transform, width, height, parent.parent]);

  return (
    active ? (
      <div id={id} className={parent.name} style={style}>
        {children}
      </div>
    ) : null
  );
};

export default PixiHtmlContainer;
