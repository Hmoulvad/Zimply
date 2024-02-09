import Button from "app/views/components/UI/Button";
import ArrowRight from "app/views/components/UI/Icons/ArrowRight";
import Headline from "app/views/components/UI/Typography/Headline";
import Text from "app/views/components/UI/Typography/Text";
import RootLayout from "app/views/layout/Root";
import type { FC } from "hono/jsx";
import { mainStyle, sectionStyle } from "./styles";
import Accordion from "app/views/components/UI/Accordion/Accordion";

const UIPage: FC = () => (
  <RootLayout title="UIPage">
    <main class={mainStyle}>
      <section class={sectionStyle}>
        <Headline as="h1">Display1</Headline>
        <Headline as="h2">Display2</Headline>
        <Headline as="h3">Display3</Headline>
        <Headline as="h4">Display4</Headline>
        <Headline as="h5">Display5</Headline>
        <Headline as="h6">Display6</Headline>
      </section>
      <section class={sectionStyle}>
        <Text variant="body">Body</Text>
        <Text variant="label">Label</Text>
      </section>
      <section class={sectionStyle}>
        <Button size="small">Button Small</Button>
        <Button size="medium">Button Medium</Button>
        <Button size="large">Button Large</Button>
        <Button icon={<ArrowRight />} size="small">
          Button Small
        </Button>
        <Button icon={<ArrowRight />} size="medium">
          Button Medium
        </Button>
        <Button icon={<ArrowRight />} size="large">
          Button Large
        </Button>
      </section>
      <section>
        <Accordion title="Accordion example">
          This is the content of the accordion.
        </Accordion>
      </section>
    </main>
  </RootLayout>
);

export default UIPage;
