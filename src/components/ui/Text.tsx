import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textVariants = cva("scroll-m-20 tracking-tight text-balance", {
  variants: {
    size: {
      h1: "text-4xl font-extrabold",
      h2: "text-3xl font-semibold",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
      p: "leading-7",
      small: "text-sm leading-6",
      extraSmall: "text-xs leading-5",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    size: "p",
    align: "left",
  },
});

type TextProps = React.PropsWithChildren<
  VariantProps<typeof textVariants> & { className?: string }
>;

const Text: React.FC<TextProps> = ({
  size,
  align,
  className,
  children,
}) => {
  const Component =
    size && ["h1", "h2", "h3", "h4"].includes(size) ? (size as any) : "p";

  return (
    <Component className={cn(textVariants({ size, align }), className)}>
      {children}
    </Component>
  );
};

export { Text, textVariants }
