import { css } from "hono/css";

export const htmlStyle = css`
  body {
    min-height: 100svh;
  }
  main {
    padding: var(--size-2);
  }
  img,
  picture,
  svg,
  video {
    display: block;
    max-width: 100%;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-wrap: balance;
  }
  p {
    text-wrap: pretty;
  }
  @media (prefers-reduced-motion: no-preference) {
    :has(:target) {
      scroll-behavior: smooth;
      scroll-padding-top: 2rem;
    }
  }
`;
