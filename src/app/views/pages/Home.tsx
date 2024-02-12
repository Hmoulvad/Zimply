import type { FC } from "hono/jsx";
import Headline from "../components/UI/Typography/Headline/Headline";
import RootLayout from "../layout/Root";
import Grid from "../components/Grid";

const HomePage: FC = () => (
  <RootLayout title="HomePage">
    <main>
      <Headline>Home</Headline>
      <img
        src="static/placeholder.jpg"
        width={200}
        height={200}
        alt="placeholder"
      />
      <Grid></Grid>
    </main>
  </RootLayout>
);

export default HomePage;
