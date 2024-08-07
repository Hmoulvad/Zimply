import { css } from "hono/css";

export default function Users() {
  return (
    <ul class={listStyle}>
      <li>User1</li>
      <li>User2</li>
      <li>User3</li>
    </ul>
  );
}

const listStyle = css`
  list-style: none;
  display: grid;
  gap: var(--size-2);
`;
