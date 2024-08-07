import { css } from "hono/css";
import Link from "./UI/Link";

export default function Header() {
  return (
    <header class={headerStyle}>
      <ul class={linksStyle}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/ui">UI</Link>
        </li>
      </ul>
    </header>
  );
}

const headerStyle = css`
  height: var(--size-9);
  display: flex;
  align-items: center;
  padding: 0 var(--size-2);
`;

const linksStyle = css`
  display: flex;
  list-style-type: none;
  gap: var(--size-2);
`;
