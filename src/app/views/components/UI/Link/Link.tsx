import type { FC } from "hono/jsx";
import Text from "../Typography/Text";
import { baseStyle } from "./styles";

type Props = Hono.AnchorHTMLAttributes;

const Link: FC<Props> = ({ children, ...rest }) => (
  <a class={baseStyle} {...rest}>
    <Text as="span">{children}</Text>
  </a>
);

export default Link;
