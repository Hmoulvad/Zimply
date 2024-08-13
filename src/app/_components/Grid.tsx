import { css } from "hono/css";
import type { PropsWithChildren } from "hono/jsx";

type Column = PropsWithChildren<{
  span: 3 | 4 | 6 | 8 | 12;
}>;

type Props = {
  columns: Column[];
};

export default function Grid({ columns }: Props) {
  return (
    <ul class={gridStyle}>
      {columns.map((column) => (
        <Column span={column.span}>{column.children}</Column>
      ))}
    </ul>
  );
}

function Column({ children, span }: Column) {
  return <li class={getColSpan(span)}>{children}</li>;
}

function getColSpan(span: Column["span"]) {
  switch (span) {
    case 3:
      return colSpan3;
    case 4:
      return colSpan4;
    case 6:
      return colSpan6;
    case 8:
      return colSpan8;
    case 12:
      return colSpan12;
  }
}

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--size-3);
  list-style: none;
`;

const colSpan3 = css`
  grid-column: span 3;
`;

const colSpan4 = css`
  grid-column: span 4;
`;

const colSpan6 = css`
  grid-column: span 6;
`;

const colSpan8 = css`
  grid-column: span 8;
`;

const colSpan12 = css`
  grid-column: span 12;
`;
