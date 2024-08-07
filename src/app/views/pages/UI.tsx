import Accordion from "app/views/components/UI/Accordion";
import { Button } from "app/views/components/UI/Button";
import Dialog from "app/views/components/UI/Dialog/Dialog";
import ArrowRight from "app/views/components/UI/Icons/ArrowRight";
import Select from "app/views/components/UI/Select";
import Headline from "app/views/components/UI/Typography/Headline";
import Text from "app/views/components/UI/Typography/Text";
import RootLayout from "app/views/layout/Root";
import { css } from "hono/css";

export default function UIPage() {
  return (
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
          <Select
            label="Label"
            options={["Item1", "Item2", "Item3", "Item4", "Item5"]}
          />
        </section>
        <section class={sectionStyle}>
          <Button size="small">Button Small</Button>
          <Button size="medium">Button Medium</Button>
          <Button size="large">Button Large</Button>
          <Button isLoading size="small" />
          <Button isLoading size="medium" />
          <Button isLoading size="large" />
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
        <section class={sectionStyle}>
          <Accordion title="Accordion example">
            This is the content of the accordion.
          </Accordion>
        </section>
        <section x-data class={sectionStyle}>
          <Button x-on:click="$refs.dialogRef.showModal()">Open Dialog</Button>
          <Dialog title="AlpineJS Dialog" ref="dialogRef"></Dialog>
        </section>
      </main>
    </RootLayout>
  );
}

const mainStyle = css`
  display: grid;
  gap: var(--size-2);
`;

const sectionStyle = css`
  display: grid;
  gap: var(--size-2);
`;
