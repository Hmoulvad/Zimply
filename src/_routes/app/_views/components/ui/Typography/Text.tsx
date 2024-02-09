import { css, cx } from "hono/css";
import type { FC } from "hono/jsx";

type Props = {
  as?: keyof Hono.IntrinsicElements;
  variant?: "body" | "label";
};

function getVariantStyle(variant: Props["variant"]) {
  switch (variant) {
    case "body":
      return cx(baseStyle, body);
    case "label":
      return cx(baseStyle, label);
    default:
      return cx(baseStyle, body);
  }
}

const Text: FC<Props> = async ({ as, variant, children, ...rest }) => {
  const Element = as ?? "p";

  return (
    <Element class={getVariantStyle(variant)} {...rest}>
      {children}
    </Element>
  );
};

const baseStyle = css`
  font-family: var(--font-sans);
`;

const body = css`
  font-size: var(--font-size-2);
  font-weight: var(--font-weight-3);
  line-height: var(--font-lineheight-3);
`;

const label = css`
  font-size: var(--font-size-1);
  font-weight: var(--font-weight-3);
  line-height: var(--font-lineheight-2);
`;

export default Text;
