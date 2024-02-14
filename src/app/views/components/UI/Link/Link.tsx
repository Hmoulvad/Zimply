import type { PropsWithChildren } from "hono/jsx";
import Text from "../Typography/Text/Text";
import { baseStyle } from "./styles";

type Props = Hono.AnchorHTMLAttributes & PropsWithChildren;

export default function Link({ children, ...rest }: Props) {
  return (
    <a class={baseStyle} {...rest}>
      <Text as="span">{children}</Text>
    </a>
  );
}
