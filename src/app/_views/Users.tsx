import { css } from "hono/css";

type Props = {
  users: { id: number; name: string; email: string }[];
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
