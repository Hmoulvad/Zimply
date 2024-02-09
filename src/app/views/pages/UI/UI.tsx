import Button from "app/views/components/UI/Button";
import Headline from "app/views/components/UI/Typography/Headline";
import Text from "app/views/components/UI/Typography/Text";
import RootLayout from "app/views/layout/Root";
import type { FC } from "hono/jsx";
import { mainStyle, sectionStyle } from "./styles";
import ArrowRight from "app/views/components/UI/Icons/ArrowRight";

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
        <Button icon={<ArrowRight />} size="small">
          Button Small
        </Button>
        <Button icon={<ArrowRight />} size="medium">
          Button Medium
        </Button>
        <Button icon={<ArrowRight />} size="large">
          Button Large
        </Button>
        <Button fill size="small">
          Button Small
        </Button>
        <Button fill size="medium">
          Button Medium
        </Button>
        <Button fill size="large">
          Button Large
        </Button>
        <Button fill isLoading size="small">
          Button Small
        </Button>
        <Button fill disabled size="small">
          Button Small
        </Button>
      </section>
    </main>
  </RootLayout>
);

export default UIPage;