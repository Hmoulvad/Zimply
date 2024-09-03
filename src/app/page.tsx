import Display from "components/UI/Display";
import { css } from "hono/css";

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
