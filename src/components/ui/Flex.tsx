// flex component thats a wrapper around a div with display flex
import React from 'react';

import { cn } from '@/lib/utils';

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  gap?: number; // gap in pixels
}

export const Flex: React.FC<FlexProps> = ({
  children,
  className,
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  gap = 0,
  ...rest
}) => {
  const directionClass = {
    row: 'flex-row',
    column: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'column-reverse': 'flex-col-reverse',
  }[direction];

  const alignClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  }[align];

  const justifyClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }[justify];
  const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap';
  const gapStyle = gap ? { gap: `${gap}px` } : undefined;

  return (
    <div
      className={cn('flex', directionClass, alignClass, justifyClass, wrapClass, className)}
      style={gapStyle}
      {...rest}>
      {children}
    </div>
  );
};
