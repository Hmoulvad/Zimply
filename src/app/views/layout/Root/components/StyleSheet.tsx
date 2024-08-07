import { Style } from "hono/css";

export default function StyleSheets() {
  return (
    <>
      {/* Global styles */}
      <style>
        {`
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
          font-family: system-ui, sans-serif;
        }

        /* dark mode user-agent-styles */
        html {
          color-scheme: dark light;
        }

        * {
          padding: 0;
          margin: 0;
          font-family: system-ui, sans-serif;
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
            scroll-padding-top: var(--space-08);
          }
        }
      `}
      </style>
      {/* Open Props Variables */}
      <link rel="stylesheet" href="https://unpkg.com/open-props" />
      {/* Hono CSS */}
      <Style />
    </>
  );
}
