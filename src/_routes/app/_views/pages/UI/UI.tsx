import RootLayout from "_routes/app/_views/layout/Root";
import type { FC } from "hono/jsx";
import Headline from "../../components/UI/Typography/Headline";
import Text from "../../components/UI/Typography/Text";
import { mainStyle, sectionStyle } from "./styles";
import Button from "../../components/UI/Button";

const UIPage: FC = () => (
  <RootLayout>
    <main class={mainStyle}>
      <section class={sectionStyle}>
        <Headline as="h1">Display1</Headline>
        <Headline as="h2">Display2</Headline>
        <Headline as="h3">Display3</Headline>
        <Headline as="h4">Display4</Headline>
      </section>
      <section class={sectionStyle}>
        <Text variant="body">Body</Text>
        <Text variant="label">Label</Text>
      </section>
      <section class={sectionStyle}>
        <Button size="small">Button Small</Button>
        <Button size="medium">Button Medium</Button>
        <Button size="large">Button Large</Button>
      </section>
    </main>
  </RootLayout>
);

export default UIPage;
