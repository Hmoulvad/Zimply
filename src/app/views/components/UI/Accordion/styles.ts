import { css } from "hono/css";

export const detailsStyle = css`
  width: fit-content;
  border: var(--border-size-1) solid black;
  padding: var(--size-2);
  border-radius: var(--radius-2);

  &[open] {
    summary {
      margin-bottom: 0;
    }
  }
`;

export const summaryStyle = css`
  margin: calc(var(--size-2) * -1);
  padding: var(--size-2);
  display: block;
  cursor: pointer;
  transition: margin 0.5s ease-in-out;

  &::marker {
    display: none;
  }
`;
