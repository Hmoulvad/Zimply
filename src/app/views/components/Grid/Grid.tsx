import type { PropsWithChildren } from "hono/jsx";
import {
  colSpan12,
  colSpan3,
  colSpan4,
  colSpan6,
  colSpan8,
  gridStyle,
} from "./styles";

type Coloumn = {
  span: 3 | 4 | 6 | 8 | 12;
} & PropsWithChildren;

type Props = {
  columns: Coloumn[];
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

function Column({ children, span }: Coloumn) {
  return <li class={getColSpan(span)}>{children}</li>;
}

function getColSpan(span: Coloumn["span"]) {
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
