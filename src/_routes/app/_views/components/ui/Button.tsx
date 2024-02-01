import { css } from "hono/css";
import type { FC } from "hono/jsx";

const Button: FC<Hono.ButtonHTMLAttributes> = ({ children, ...rest }) => (
  <button class={buttonStyle} {...rest}>
    {children}
  </button>
);

const buttonStyle = css`
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 1rem;
`;

export default Button;
