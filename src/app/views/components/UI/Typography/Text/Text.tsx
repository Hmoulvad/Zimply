import { cx } from "hono/css";
import type { PropsWithChildren } from "hono/jsx";
import { baseStyle, bodyStyle, labelStyle } from "./styles";

type Props = {
  as?: keyof Hono.IntrinsicElements;
  className?: Promise<string>;
  variant?: "body" | "label";
} & PropsWithChildren;

export default function Text({
  as,
  variant,
  className,
  children,
  ...rest
}: Props) {
  const Element = as ?? "p";

  return (
    <Element class={getVariantStyle(variant, className)} {...rest}>
      {children}
    </Element>
  );
}

function getVariantStyle(
  variant: Props["variant"],
  className: Props["className"]
) {
  let args = [baseStyle];
  switch (variant) {
    case "body":
      args.push(bodyStyle);
      break;
    case "label":
      args.push(labelStyle);
      break;
    default:
      args.push(bodyStyle);
  }
  if (className) args.push(className);
  return cx(...args);
}
