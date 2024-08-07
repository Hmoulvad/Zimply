import { PropsWithChildren } from "hono/jsx";

export type ButtonProps = {
  fill?: boolean;
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
} & PropsWithChildren;
