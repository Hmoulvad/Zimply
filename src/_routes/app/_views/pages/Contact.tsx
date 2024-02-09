import RootLayout from "_routes/app/_views/layout/Root";
import type { FC } from "hono/jsx";

const ContactPage: FC = () => (
  <RootLayout>
    <main>Contact</main>
  </RootLayout>
);

export default ContactPage;
