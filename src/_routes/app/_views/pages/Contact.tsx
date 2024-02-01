import RootLayout from "_routes/app/_views/layout/Root";
import type { FC } from "hono/jsx";
import Button from "../components/ui/Button";

const ContactPage: FC = () => (
  <RootLayout>
    <main>
      <h1>Contact</h1>
      <Button>Hej med dig</Button>
    </main>
  </RootLayout>
);

export default ContactPage;
