import { css } from "hono/css";
import Carousel from "ui/Carousel";
import Display from "ui/Display";

export default function HomePage() {
  return (
    <>
      <section class={gapStyle}>
        <Display as="h1" variant="display3">
          HomePage
        </Display>
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

const gapStyle = css`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
`;
