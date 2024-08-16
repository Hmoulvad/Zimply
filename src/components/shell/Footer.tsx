import type { PropsWithChildren } from "hono/jsx";
import Display from "./UI/Display";
import { css } from "hono/css";

export default function Footer({ children }: PropsWithChildren) {
  return (
    <footer class={footerStyle}>
      <Display variant="display3">Footer</Display>
    </footer>
  );
}

const footerStyle = css`
  padding: var(--size-2);
`;
