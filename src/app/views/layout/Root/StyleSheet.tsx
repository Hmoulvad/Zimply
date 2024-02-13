import { Style } from "hono/css";
import { FC } from "hono/jsx";

const StyleSheets: FC = () => (
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

export default StyleSheets;
