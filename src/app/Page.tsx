import { css } from "hono/css";
import { Button } from "../components/UI/Button";
import Input from "../components/UI/Form/Input";
import generateUniqueId from "utils/generateUniqueId";

export default function HomePage() {
  const userId = generateUniqueId("user");
  return (
    <section class={gapStyle}>
      <form
        class={gapStyle}
        hx-post="/api/users/add"
        hx-target={`#${userId}`}
        hx-trigger="submit"
      >
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
      <Button
        hx-get="/api/users/all"
        hx-swap="innerHTML"
        hx-target={`#${userId}`}
      >
        Get Users
      </Button>
      <div id={userId}></div>
    </section>
  );
}

const gapStyle = css`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
`;
