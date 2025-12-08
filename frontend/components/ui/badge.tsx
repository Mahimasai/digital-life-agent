// components/ui/badge.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium " +
    "transition-colors";

  const defaultStyles =
    "bg-white/10 border-white/20 text-white";
  const outlineStyles =
    "border-white/40 text-white/80";

  const styles = variant === "outline" ? outlineStyle
// components/ui/badge.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium " +
    "transition-colors";

  const defaultStyles =
    "bg-white/10 border-white/20 text-white";
  const outlineStyles =
    "border-white/40 text-white/80";

  const styles = variant === "outline" ? outlineStyle
