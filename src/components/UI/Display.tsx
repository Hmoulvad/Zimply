import { css, cx } from "hono/css";
import type { JSX, PropsWithChildren } from "hono/jsx";

type Props = PropsWithChildren<{
  as?: keyof JSX.IntrinsicElements;
  variant?:
    | "display1"
    | "display2"
    | "display3"
    | "display4"
    | "display5"
    | "display6";
}>;

export default function Display({ as, variant, children, ...rest }: Props) {
  const Element = as ?? "h2";

  return (
    <Element class={getVariantStyle(variant, as)} {...rest}>
      {children}
    </Element>
  );
}

function getVariantStyle(variant: Props["variant"], as: Props["as"]) {
  switch (variant ?? as) {
    case "h1":
    case "display1":
      return cx(baseStyle, h1Style);
    case "h2":
    case "display2":
      return cx(baseStyle, h2Style);
    case "h3":
    case "display3":
      return cx(baseStyle, h3Style);
    case "h4":
    case "display4":
      return cx(baseStyle, h4Style);
    case "h5":
    case "display5":
      return cx(baseStyle, h5Style);
    case "h6":
    case "display6":
      return cx(baseStyle, h6Style);
    default:
      return cx(baseStyle, h2Style);
  }
}

const baseStyle = css`
  font-family: var(--font-sans);
  line-height: var(--font-lineheight-1);
  font-weight: var(--font-weight-7);
`;

const h1Style = css`
  font-size: var(--font-size-8);
`;

const h2Style = css`
  font-size: var(--font-size-7);
`;

const h3Style = css`
  font-size: var(--font-size-6);
`;

const h4Style = css`
  font-size: var(--font-size-5);
`;

const h5Style = css`
  font-size: var(--font-size-4);
`;

const h6Style = css`
  font-size: var(--font-size-3);
`;
