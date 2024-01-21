import React, { CSSProperties, ReactNode } from 'react';

interface ContainerProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  display?: CSSProperties['display'];
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  alignContent?: CSSProperties['alignContent'];
  flexWrap?: CSSProperties['flexWrap'];
  flexGrow?: CSSProperties['flexGrow'];
  flexShrink?: CSSProperties['flexShrink'];
  children?: ReactNode;
  style?: CSSProperties;
}

export function Container({
  as: Element = 'div',
  className,
  display = 'flex',
  flexDirection = 'column',
  justifyContent,
  alignItems,
  alignContent,
  flexWrap,
  flexGrow,
  flexShrink,
  children,
  style,
}: ContainerProps): JSX.Element {
  const containerStyles: CSSProperties = {
    display,
    flexDirection,
    justifyContent,
    alignItems,
    alignContent,
    flexWrap,
    flexGrow,
    flexShrink,
    ...style,
  };

  return React.createElement(
    Element,
    { style: containerStyles, className },
    children
  );
}
