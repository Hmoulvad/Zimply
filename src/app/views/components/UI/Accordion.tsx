import { css } from "hono/css";
import type { PropsWithChildren } from "hono/jsx";
import Text from "./Typography/Text";

type Props = {
  title: string;
} & PropsWithChildren;

export default function Accordion({ title, children }: Props) {
  return (
    <details class={detailsStyle}>
      <Text as="summary" className={summaryStyle}>
        {title}
      </Text>
      {children}
    </details>
  );
}

const detailsStyle = css`
  width: fit-content;
  border: var(--border-size-1) solid black;
  padding: var(--size-2);
  min-height: calc(var(--size-7) + var(--size-2));
  border-radius: var(--radius-2);

  &[open] {
    summary {
      margin-bottom: 0;
    }
  }
`;

const summaryStyle = css`
  margin: calc(var(--size-2) * -1);
  padding: var(--size-2);
  display: block;
  cursor: pointer;
  transition: margin 0.5s ease-in-out;

  &::marker {
    display: none;
  }
`;
