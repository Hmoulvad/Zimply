import { Button } from "../components/UI/Button";
import RootLayout from "../layout/Root";

export default function HomePage() {
  return (
    <RootLayout title="HomePage">
      <main>
        <Button hx-get="/api" hx-swap="innerHTML">
          Test
        </Button>
      </main>
    </RootLayout>
  );
}
