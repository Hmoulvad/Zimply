import type { Child, PropsWithChildren } from "hono/jsx";

export type ButtonProps = PropsWithChildren<{
  fill?: boolean;
  icon?: Child;
  iconPosition?: "left" | "right";
  size?: "small" | "medium";
}>;
