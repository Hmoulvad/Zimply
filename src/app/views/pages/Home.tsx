import Grid from "../components/Grid";
import Headline from "../components/UI/Typography/Headline/Headline";
import RootLayout from "../layout/Root";

export default function HomePage() {
  return (
    <RootLayout title="HomePage">
      <main>
        <Headline>Home</Headline>
        <Grid></Grid>
      </main>
    </RootLayout>
  );
}
