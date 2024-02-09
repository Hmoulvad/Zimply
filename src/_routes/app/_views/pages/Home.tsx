import RootLayout from "_routes/app/_views/layout/Root";
import type { FC } from "hono/jsx";
import Headline from "../components/ui/Typography/Headline";

const HomePage: FC = () => (
  <RootLayout>
    <main>
      <Headline>Home</Headline>
    </main>
  </RootLayout>
);

export default HomePage;
