import { css, cx } from "hono/css";
import type { JSX, PropsWithChildren } from "hono/jsx";

type Props<T extends keyof JSX.IntrinsicElements> = {
  as?: T;
  className?: Promise<string>;
  variant?: "body" | "label";
} & PropsWithChildren<JSX.IntrinsicElements[T]>;

export default function Typography<T extends keyof JSX.IntrinsicElements>({
  as,
  variant,
  className,
  children,
  ...rest
}: Props<T>) {
  const Element = as ?? "p";

  return (
    <Element class={getVariantStyle(variant, className)} {...rest}>
      {children}
    </Element>
  );
}

function getVariantStyle(
  variant: Props<keyof JSX.IntrinsicElements>["variant"],
  className: Props<keyof JSX.IntrinsicElements>["className"]
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
