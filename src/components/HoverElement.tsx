import React from 'react';
import clsx from 'clsx';

export default function HoverElement({ className, elementType, text }: { className?: string, elementType: string, text: string }) {
  const element = React.createElement(elementType, {
    className: clsx('cursor-hover', !className?.includes('font') && 'font-medium', className),
  }, text.toUpperCase());
  
  return element;
}