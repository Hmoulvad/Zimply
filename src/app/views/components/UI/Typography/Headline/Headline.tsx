import { cx } from "hono/css";
import type { PropsWithChildren } from "hono/jsx";
import {
  baseStyle,
  h1Style,
  h2Style,
  h3Style,
  h4Style,
  h5Style,
  h6Style,
} from "./styles";

type Props = {
  as?: keyof Hono.IntrinsicElements;
  variant?:
    | "display1"
    | "display2"
    | "display3"
    | "display4"
    | "display5"
    | "display6";
} & PropsWithChildren;

export default function Headline({ as, variant, children, ...rest }: Props) {
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
