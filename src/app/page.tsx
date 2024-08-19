import Button from "components/UI/Button/Button";
import Display from "components/UI/Display";
import { css } from "hono/css";
import generateHTMXAttributes from "utils/generateHTMXAttributes";
import Input from "../components/UI/Form/Input";

export default function HomePage() {
  const user = generateHTMXAttributes("user");
  return (
    <section class={gapStyle}>
      <Display as="h1" variant="display3">
        Users within the Application
      </Display>
      <form
        class={gapStyle}
        hx-post="/api/users/add"
        hx-target={user["htmx-target"]}
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
        hx-target={user["htmx-target"]}
      >
        Get Users
      </Button>
      <div id={user["htmx-id"]}></div>
    </section>
  );
}

const gapStyle = css`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
`;
