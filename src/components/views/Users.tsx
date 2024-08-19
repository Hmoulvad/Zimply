import { css } from "hono/css";
import type { DatabaseTypes } from "types/databaseTypes";

type Props = {
  users: DatabaseTypes.User[];
};

export default function Users({ users }: Props) {
  return (
    <ul class={listStyle}>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}

const listStyle = css`
  list-style: none;
  display: grid;
  gap: var(--size-2);
`;
