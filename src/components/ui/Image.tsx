import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const imageVariants = cva('overflow-hidden inline-block', {
  variants: {
    variant: {
      default: 'rounded-md',
      rounded: 'rounded-md',
      circle: 'rounded-full',
    },
    fit: {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
      scaleDown: 'object-scale-down',
    },
    shadow: {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    fit: 'cover',
    shadow: 'none',
  },
});

type ImageProps = React.PropsWithChildren<
  VariantProps<typeof imageVariants> & {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    loading?: 'lazy' | 'eager';
    placeholder?: React.ReactNode;
    className?: string;
    [key: string]: any;
  }
>;

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      loading = 'lazy',
      priority = false,
      placeholder,
      variant,
      fit,
      shadow,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={cn(imageVariants({ variant, fit, shadow }), className)}
        style={{ width: width ?? undefined, height: height ?? undefined }}>
        {placeholder ? (
          <div aria-hidden className="w-full h-full">
            {placeholder}
          </div>
        ) : null}

        <img
          ref={ref}
          src={src}
          alt={alt}
          width={typeof width === 'number' ? width : undefined}
          height={typeof height === 'number' ? height : undefined}
          loading={priority ? 'eager' : loading}
          className={cn('w-full h-full block', fit === 'cover' ? '' : '')}
          {...rest}
        />
      </div>
    );
  }
);

export { Image, imageVariants };
export type { ImageProps };
