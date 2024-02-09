import { css } from "hono/css";

export const baseStyle = css`
  text-decoration: underline 0.1rem transparent;
  text-underline-offset: 0.2em;
  transition: text-decoration-color 400ms;

  &:hover {
    text-decoration-color: var(--green-10);
  }
`;
