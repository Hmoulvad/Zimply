import { cx } from "hono/css";
import type { FC } from "hono/jsx";
import { baseStyle, largeStyle, mediumStyle, smallStyle } from "./styles";
import Text from "../Typography/Text";

type Props = {
  size?: "small" | "medium" | "large";
} & Hono.ButtonHTMLAttributes;

const Button: FC<Props> = ({ size = "medium", children, ...rest }) => (
  <button class={getButtonStyle(size)} {...rest}>
    <Text as="span" variant="body">
      {children}
    </Text>
  </button>
);

function getButtonStyle(size: Props["size"]) {
  switch (size) {
    case "small":
      return cx(baseStyle, smallStyle);
    case "medium":
      return cx(baseStyle, mediumStyle);
    case "large":
      return cx(baseStyle, largeStyle);
  }
}
export default Button;
