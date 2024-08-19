import { css } from "hono/css";
import type { PropsWithChildren } from "hono/jsx";
import ChevronDown from "./Icons/Chevron/Down";
import Typography from "./Typography";

type Props = PropsWithChildren<{
  title: string;
}>;

export default function Accordion({ title, children }: Props) {
  return (
    <details class={detailsStyle}>
      <Typography as="summary" className={summaryStyle}>
        {title}
        <ChevronDown />
      </Typography>
      {children}
    </details>
  );
}

const detailsStyle = css`
  width: fit-content;
  border-width: var(--border-size-1);
  border-style: solid;
  padding: var(--size-2);
  min-height: var(--size-8);

  &:hover {
    background-color: var(--gray-9);
  }

  &[open] {
    summary {
      margin-bottom: 0;

      & > svg {
        transform: rotate(180deg);
      }
    }
  }
`;

const summaryStyle = css`
  margin: calc(var(--size-2) * -1);
  padding: var(--size-2);
  display: block;
  cursor: pointer;
  transition: margin 0.5s ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--size-2);

  & > svg {
    height: var(--size-4);
    width: var(--size-4);
    transform: rotate(0deg);
    transition: transform 0.5s ease-in-out;
  }

  &::marker {
    display: none;
  }
`;
