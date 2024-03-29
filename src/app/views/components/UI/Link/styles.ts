import { css } from "hono/css";

export const baseStyle = css`
  color: black;
  text-decoration: underline 0.1rem transparent;
  text-underline-offset: 0.2em;
  transition: text-decoration-color 400ms;

  &:hover {
    text-decoration-color: black;
  }
`;
