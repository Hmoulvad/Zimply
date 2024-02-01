import RootLayout from "_routes/app/_views/layout/Root";
import type { FC } from "hono/jsx";

const HomePage: FC = () => (
  <RootLayout>
    <main>
      <a href="/contact">Contact</a>
      <h1>Home</h1>
    </main>
  </RootLayout>
);

export default HomePage;
