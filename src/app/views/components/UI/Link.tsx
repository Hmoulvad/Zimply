import { css } from "hono/css";
import type { JSX, PropsWithChildren } from "hono/jsx";
import Text from "./Typography/Text";

type Props = JSX.HTMLAttributes & PropsWithChildren;

export default function Link({ children, ...rest }: Props) {
  return (
    <a class={baseStyle} {...rest}>
      <Text as="span">{children}</Text>
    </a>
  );
}

const baseStyle = css`
  color: black;
  text-decoration: underline 0.1rem transparent;
  text-underline-offset: 0.2em;
  transition: text-decoration-color 400ms;

  &:hover {
    text-decoration-color: black;
  }
`;
