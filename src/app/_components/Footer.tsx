import type { PropsWithChildren } from "hono/jsx";
import { css } from "hono/css";
import Display from "ui/Display";

export default function Footer({}: PropsWithChildren) {
  return (
    <footer class={footerStyle}>
      <Display variant="display3">Footer</Display>
    </footer>
  );
}

const footerStyle = css`
  padding: var(--size-2);
`;
