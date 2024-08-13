import { Button } from "./_components/UI/Button";
import Input from "./_components/UI/Form/Input";

export default function HomePage() {
  return (
    <>
      <form hx-post="/api/users/add" hx-target="#users">
        <Input
          label="Name of the user"
          type="text"
          name="name"
          placeholder="Name"
        />
        <Input
          label="Email of the user"
          type="email"
          name="email"
          placeholder="Email"
        />
        <Button type="submit">Add User</Button>
      </form>
      <Button hx-get="/api/users/all" hx-swap="innerHTML" hx-target="#users">
        Get Users
      </Button>
      <div id="users"></div>
    </>
  );
}
