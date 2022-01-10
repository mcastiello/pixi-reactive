import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { ParentContext, PropsContext } from '../contexts';
import { usePropsContext } from '../hooks';
import { PixiHtmlContainerProps } from '../props';
import { Overflow } from '../types';

const childStyle: CSSProperties = {
  pointerEvents: 'auto'
}

const PixiHtmlContainer: React.FC<PixiHtmlContainerProps> = ({ children, ...props }) => {
  const propsContext = usePropsContext<PixiHtmlContainerProps>(props);
  const { properties } = propsContext;
  const { left, top, transform, width, height, parent } = useContext(ParentContext);
  const { id, overflow = Overflow.All } = properties;
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

  return active ? (
    <div id={id} className={parent.name} style={style}>
      <PropsContext.Provider value={propsContext}><div style={childStyle}>{children}</div></PropsContext.Provider>
    </div>
  ) : null;
};

export default PixiHtmlContainer;
