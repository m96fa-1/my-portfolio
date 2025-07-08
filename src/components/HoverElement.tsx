import React from 'react';
import clsx from 'clsx';

export default function HoverElement({ className, elementType, text }: { className?: string, elementType: string, text: string }) {
  const element = React.createElement(elementType, {
    className: clsx(className, 'cursor-hover'),
  }, text.toUpperCase());
  
  return element;
}