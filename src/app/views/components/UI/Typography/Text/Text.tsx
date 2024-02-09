import { cx } from "hono/css";
import type { FC } from "hono/jsx";
import { baseStyle, bodyStyle, labelStyle } from "./styles";

type Props = {
  as?: keyof Hono.IntrinsicElements;
  variant?: "body" | "label";
};

function getVariantStyle(variant: Props["variant"]) {
  switch (variant) {
    case "body":
      return cx(baseStyle, bodyStyle);
    case "label":
      return cx(baseStyle, labelStyle);
    default:
      return cx(baseStyle, bodyStyle);
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

export default Text;
