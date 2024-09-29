import { css } from "hono/css";
import Accordion from "ui/Accordion";
import Button from "ui/Button/Button";
import Carousel from "ui/Carousel";
import Dialog from "ui/Dialog";
import Display from "ui/Display";
import ArrowRight from "ui/Icons/Arrow/Right";
import Typography from "ui/Typography";
import generateRef from "utils/generateRef";

export default function UIPage() {
  const dialogRef = generateRef();
  return (
    <>
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
        <Button size="small">Button Small</Button>
        <Button size="medium">Button Medium</Button>
        <Button icon={<ArrowRight />} size="small">
          Button Small
        </Button>
        <Button icon={<ArrowRight />} size="medium">
          Button Medium
        </Button>
      </section>
      <section class={sectionStyle}>
        <Accordion title="Accordion example">
          This is the content of the accordion.
        </Accordion>
      </section>
      <section x-data class={sectionStyle}>
        <Button x-on:click={`$refs.${dialogRef}?.showModal()`}>
          Open Dialog
        </Button>
        <Dialog type="aside" title="AlpineJS Dialog" ref={dialogRef}></Dialog>
      </section>
      <Carousel title="Dummy Carousel">
        <Display as="h2" variant="display2">
          Carousel Item 1
        </Display>
        <Display as="h2" variant="display2">
          Carousel Item 2
        </Display>
        <Display as="h2" variant="display2">
          Carousel Item 3
        </Display>
        <Display as="h2" variant="display2">
          Carousel Item 4
        </Display>
        <Display as="h2" variant="display2">
          Carousel Item 5
        </Display>
        <Display as="h2" variant="display2">
          Carousel Item 6
        </Display>
      </Carousel>
    </>
  );
}

const sectionStyle = css`
  display: grid;
  gap: var(--size-2);
`;
