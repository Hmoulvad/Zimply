import type { FC } from "hono/jsx";
import Link from "../ui/Link";
import { headerStyle, linksStyle } from "./styles";

const Header: FC = () => (
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

export default Header;
