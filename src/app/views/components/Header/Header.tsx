import Link from "../UI/Link";
import { headerStyle, linksStyle } from "./styles";

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
