import type { FC } from "hono/jsx";
import Link from "./ui/Link";

const Header: FC = ({ children }) => (
  <header>
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/contact">Contact</Link>
      </li>
    </ul>
  </header>
);

export default Header;
