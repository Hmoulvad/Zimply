import { css } from "hono/css";

export const headerStyle = css`
  height: var(--size-9);
  display: flex;
  align-items: center;
  padding: 0 var(--size-2);
`;

export const linksStyle = css`
  display: flex;
  list-style-type: none;
  gap: var(--size-2);
`;
