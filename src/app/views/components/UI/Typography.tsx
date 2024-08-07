import { css, cx } from "hono/css";
import type { JSX, PropsWithChildren } from "hono/jsx";

type Props = {
  as?: keyof JSX.IntrinsicElements;
  className?: Promise<string>;
  variant?: "body" | "label";
} & PropsWithChildren;

export default function Typography({
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

const baseStyle = css`
  font-family: var(--font-sans);
`;

const bodyStyle = css`
  font-size: var(--font-size-2);
  font-weight: var(--font-weight-3);
  line-height: var(--font-lineheight-3);
`;

const labelStyle = css`
  font-size: var(--font-size-0);
  font-weight: var(--font-weight-3);
  line-height: var(--font-lineheight-2);
`;
