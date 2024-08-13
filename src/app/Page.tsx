import { Button } from "./_components/UI/Button";
import RootLayout from "./Layout";

export default function HomePage() {
  return (
    <Button hx-get="/api/users" hx-swap="outerHTML">
      Get Users
    </Button>
  );
}
