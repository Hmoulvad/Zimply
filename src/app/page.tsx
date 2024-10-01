import { css } from "hono/css";
import Display from "ui/Display";
import Tooltip from "ui/Tooltip";

export default function HomePage() {
  return (
    <section class={gapStyle}>
      <Display as="h1" variant="display3">
        HomePage
      </Display>
      <Tooltip content="This is a Tooltip" message="Message of the Tooltip" />
    </section>
  );
}

const gapStyle = css`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
`;
