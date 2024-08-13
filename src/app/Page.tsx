import { css } from "hono/css";
import { Button } from "./_components/UI/Button";
import Input from "./_components/UI/Form/Input";

export default function HomePage() {
  return (
    <section class={gapStyle}>
      <form class={gapStyle} hx-post="/api/users/add" hx-target="#users">
        <Input
          required
          label="Username"
          type="text"
          name="name"
          placeholder="Enter the name of the user..."
        />
        <Input
          required
          label="Email"
          type="email"
          name="email"
          placeholder="Enter the email of the user..."
        />
        <Button type="submit">Add User</Button>
      </form>
      <Button hx-get="/api/users/all" hx-swap="innerHTML" hx-target="#users">
        Get Users
      </Button>
      <div id="users"></div>
    </section>
  );
}

const gapStyle = css`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
`;
