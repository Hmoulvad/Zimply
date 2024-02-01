import { css } from "hono/css";

export const resetStyle = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    padding: 0;
    margin: 0;
    font: inherit;
    font-family: system-ui, sans-serif;
  }
  html {
    color-scheme: dark light;
  }
  body {
    min-height: 100svh;
  }
  main {
    padding: 1rem;
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
