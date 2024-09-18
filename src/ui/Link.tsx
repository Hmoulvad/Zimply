import { css } from "hono/css";
import type { JSX, PropsWithChildren } from "hono/jsx";
import Typography from "./Typography";

type Props = PropsWithChildren<JSX.IntrinsicElements["a"]>;

export default function Link({ children, ...rest }: Props) {
  const fallbackTitle = typeof children === "string" ? children : undefined;
  return (
    <a title={fallbackTitle} class={baseStyle} {...rest}>
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
