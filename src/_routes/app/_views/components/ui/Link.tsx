import type { FC } from "hono/jsx";

const Link: FC<Hono.AnchorHTMLAttributes> = ({ children, ...rest }) => (
  <a class="p-2" {...rest}>
    {children}
  </a>
);

export default Link;
