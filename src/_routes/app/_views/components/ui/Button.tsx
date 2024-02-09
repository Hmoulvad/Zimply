import type { FC } from "hono/jsx";

const Button: FC<Hono.ButtonHTMLAttributes> = ({ children, ...rest }) => (
  <button {...rest}>{children}</button>
);
export default Button;
