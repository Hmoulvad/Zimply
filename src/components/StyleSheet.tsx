import { Style } from "hono/css";

export default function StyleSheets() {
  return (
    <>
      {/* Global styles */}
      <style>
        {`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        * {
          padding: 0;
          margin: 0;
          font-family: var(--font-system-ui);
        }

        html {
          color-scheme: dark light;
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
            scroll-padding-top: var(--space-08);
          }
        }

        body {
          display: grid;
          grid-template-rows: auto 1fr auto;
          gap: var(--size-2);
          height: 100vh;
        }

        main {
          padding: var(--size-2);
          display: flex;
          flex-direction: column;
          gap: var(--size-3);
        }
      `}
      </style>
      {/* Open Props Variables */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/open-props@1.7.5/sizes.min.css"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/open-props@1.7.5/fonts.min.css"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/open-props@1.7.5/colors.min.css"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/open-props@1.7.5/borders.min.css"
      />
      {/* Hono CSS */}
      <Style />
    </>
  );
}
