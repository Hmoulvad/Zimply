import { css } from "hono/css";

export const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--size-3);
  list-style: none;
`;

export const colSpan3 = css`
  grid-column: span 3;
`;

export const colSpan4 = css`
  grid-column: span 4;
`;

export const colSpan6 = css`
  grid-column: span 6;
`;

export const colSpan8 = css`
  grid-column: span 8;
`;

export const colSpan12 = css`
  grid-column: span 12;
`;
