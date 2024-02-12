import { Style } from "hono/css";
import type { FC } from "hono/jsx";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { htmlStyle } from "./styles";

type Props = {
  title: string;
};

const RootLayout: FC<Props> = ({ children, title }) => (
  <html class={htmlStyle}>
    <head>
      <Style />
      <StyleSheets />
      <Scripts />
      <title>{title}</title>
    </head>
    <body>
      <Header />
      {children}
      <Footer />
    </body>
  </html>
);

const StyleSheets: FC = () => (
  <>
    {/* Open Props Variables */}
    <link rel="stylesheet" href="https://unpkg.com/open-props" />
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
  </>
);

const Scripts: FC = () => (
  <>
    {/* AlpineJS */}
    <script
      defer
      src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
    ></script>
  </>
);

export default RootLayout;
