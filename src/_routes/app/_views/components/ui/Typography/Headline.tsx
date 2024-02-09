import { css, cx } from "hono/css";
import type { FC } from "hono/jsx";

type Props = {
  as?: keyof Hono.IntrinsicElements;
  variant?: "display1" | "display2" | "display3" | "display4" | "body";
};

function getVariantStyle(variant: Props["variant"], as: Props["as"]) {
  switch (variant ?? as) {
    case "h1":
    case "display1":
      return cx(baseStyle, h1);
    case "h2":
    case "display2":
      return cx(baseStyle, h2);
    case "h3":
    case "display3":
      return cx(baseStyle, h3);
    case "h4":
    case "display4":
      return cx(baseStyle, h4);
    default:
      return cx(baseStyle, h2);
  }
}

const Headline: FC<Props> = async ({ as, variant, children, ...rest }) => {
  const Element = as ?? "h2";

  return (
    <Element class={getVariantStyle(variant, as)} {...rest}>
      {children}
    </Element>
  );
};

const baseStyle = css`
  font-family: var(--font-sans);
`;

const h1 = css`
  font-size: var(--font-size-6);
  font-weight: var(--font-weight-7);
  line-height: var(--font-lineheight-1);
`;

const h2 = css`
  font-size: var(--font-size-5);
  font-weight: var(--font-weight-6);
  line-height: var(--font-lineheight-1);
`;

const h3 = css`
  font-size: var(--font-size-4);
  font-weight: var(--font-weight-5);
  line-height: var(--font-lineheight-1);
`;

const h4 = css`
  font-size: var(--font-size-3);
  font-weight: var(--font-weight-4);
  line-height: var(--font-lineheight-1);
`;

export default Headline;
