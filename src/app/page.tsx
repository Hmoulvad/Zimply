import { css } from "hono/css";
import Display from "ui/Display";

export default function HomePage() {
  return (
    <section class={gapStyle}>
      <Display as="h1" variant="display3">
        HomePage
      </Display>
    </section>
  );
}

const gapStyle = css`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
`;
