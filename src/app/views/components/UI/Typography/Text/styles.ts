import { css } from "hono/css";

export const baseStyle = css`
  font-family: var(--font-sans);
`;

export const bodyStyle = css`
  font-size: var(--font-size-2);
  font-weight: var(--font-weight-3);
  line-height: var(--font-lineheight-3);
`;

export const labelStyle = css`
  font-size: var(--font-size-0);
  font-weight: var(--font-weight-3);
  line-height: var(--font-lineheight-2);
`;
