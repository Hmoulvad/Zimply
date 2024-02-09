import type { FC } from "hono/jsx";
import Headline from "../components/UI/Typography/Headline";
import RootLayout from "../layout/Root";

const HomePage: FC = () => (
  <RootLayout title="HomePage">
    <main>
      <Headline>Home</Headline>
    </main>
  </RootLayout>
);

export default HomePage;
