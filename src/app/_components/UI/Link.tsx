import { css } from "hono/css";
import type { JSX, PropsWithChildren } from "hono/jsx";
import Typography from "./Typography";

type Props = JSX.HTMLAttributes & PropsWithChildren;

export default function Link({ children, ...rest }: Props) {
  return (
    <a class={baseStyle} {...rest}>
      <Typography as="span">{children}</Typography>
    </a>
  );
}

const baseStyle = css`
  color: inherit;
  text-decoration: underline 0.1rem transparent;
  text-underline-offset: 0.2em;
  transition: text-decoration-color 400ms;

  &:hover {
    text-decoration-color: inherit;
  }
`;
