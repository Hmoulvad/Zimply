import { cx } from "hono/css";
import type { FC } from "hono/jsx";
import { baseStyle, bodyStyle, labelStyle } from "./styles";

type Props = {
  as?: keyof Hono.IntrinsicElements;
  className: Promise<string>;
  variant?: "body" | "label";
};

function getVariantStyle(
  variant: Props["variant"],
  className: Props["className"]
) {
  let args = [baseStyle];
  switch (variant) {
    case "body":
      args.push(bodyStyle);
    case "label":
      args.push(labelStyle);
    default:
      args.push(bodyStyle);
  }
  if (className) args.push(className);
  return cx(...args);
}

const Text: FC<Props> = async ({
  as,
  variant,
  className,
  children,
  ...rest
}) => {
  const Element = as ?? "p";

  return (
    <Element class={getVariantStyle(variant, className)} {...rest}>
      {children}
    </Element>
  );
};

export default Text;
