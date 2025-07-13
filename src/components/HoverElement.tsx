import React from 'react';
import clsx from 'clsx';

export default function HoverElement({
  className,
  elementType,
  text,
  uppercase,
}: {
  className?: string | undefined,
  elementType: string,
  text: string,
  uppercase?: boolean | undefined
}) {
  const element = React.createElement(elementType, {
    className: clsx('cursor-hover', !className?.includes('font') && 'font-medium', className),
  }, uppercase === undefined ? text.toUpperCase() : uppercase ? text.toUpperCase() : text);
  
  return element;
}