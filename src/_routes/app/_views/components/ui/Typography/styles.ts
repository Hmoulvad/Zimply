import { css } from "hono/css";

export const baseStyle = css`
  font-family: var(--font-sans);
`;

export const h1Style = css`
  font-size: var(--font-size-6);
  font-weight: var(--font-weight-7);
  line-height: var(--font-lineheight-1);
`;

export const h2Style = css`
  font-size: var(--font-size-5);
  font-weight: var(--font-weight-6);
  line-height: var(--font-lineheight-1);
`;

export const h3Style = css`
  font-size: var(--font-size-4);
  font-weight: var(--font-weight-5);
  line-height: var(--font-lineheight-1);
`;

export const h4Style = css`
  font-size: var(--font-size-3);
  font-weight: var(--font-weight-4);
  line-height: var(--font-lineheight-1);
`;

export const bodyStyle = css`
  font-size: var(--font-size-2);
  font-weight: var(--font-weight-3);
  line-height: var(--font-lineheight-3);
`;

export const labelStyle = css`
  font-size: var(--font-size-1);
  font-weight: var(--font-weight-3);
  line-height: var(--font-lineheight-2);
`;
