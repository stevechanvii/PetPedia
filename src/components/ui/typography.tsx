import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function TypographyH1({ children, className }: Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }: Props) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-2xl font-bold tracking-tight first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyP({ children, className }: Props) {
  return <p className={cn("font-sans", className)}>{children}</p>;
}

export function TypographyPBold({ children, className }: Props) {
  return (
    <p
      className={cn(
        "text-base font-medium leading-relaxed tracking-normal",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function TypographyP2({ children, className }: Props) {
  return (
    <p className={cn("font-sans text-sm font-normal", className)}>{children}</p>
  );
}

export function TypographyMuted({ children, className }: Props) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}
