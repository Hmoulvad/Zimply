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
          font: inherit;
          font-family: var(--font-sans);
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
