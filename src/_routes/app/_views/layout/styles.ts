import { css } from "hono/css";

export const resetStyle = css`
  /* makes sizing simpler */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* remove default spacing */
  /* force styling  */
  * {
    padding: 0;
    margin: 0;
    font: inherit;
    font-family: var(--font-sans);
  }

  /* dark mode user-agent-styles */
  html {
    color-scheme: dark light;
  }

  body {
    min-height: 100svh;
  }

  /* add padding to main */
  main {
    padding: var(--size-2);
  }

  /* responsive images/videos */
  img,
  picture,
  svg,
  video {
    display: block;
    max-width: 100%;
  }

  /* adding text-wrap balance to headlines */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-wrap: balance;
  }

  /* adding text-wrap pretty to paragraphs */
  p {
    text-wrap: pretty;
  }

  /* adding scroll behaviour smooth if reduced motion isn't selected */
  @media (prefers-reduced-motion: no-preference) {
    :has(:target) {
      scroll-behavior: smooth;
      scroll-padding-top: 2rem;
    }
  }
`;
