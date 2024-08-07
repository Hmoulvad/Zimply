import Accordion from "app/_components/UI/Accordion";
import { Button } from "app/_components/UI/Button";
import Dialog from "app/_components/UI/Dialog/Dialog";
import ArrowRight from "app/_components/UI/Icons/ArrowRight";
import Select from "app/_components/UI/Select";
import RootLayout from "app/_layout/Root";
import { css } from "hono/css";
import Display from "../_components/UI/Display";
import Typography from "../_components/UI/Typography";

export default function UIPage() {
  return (
    <RootLayout title="UIPage">
      <section class={sectionStyle}>
        <Display as="h1">Display1</Display>
        <Display as="h2">Display2</Display>
        <Display as="h3">Display3</Display>
        <Display as="h4">Display4</Display>
        <Display as="h5">Display5</Display>
        <Display as="h6">Display6</Display>
      </section>
      <section class={sectionStyle}>
        <Typography variant="body">Body</Typography>
        <Typography variant="label">Label</Typography>
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
    </RootLayout>
  );
}

const sectionStyle = css`
  display: grid;
  gap: var(--size-2);
`;
