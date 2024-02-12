import { Style } from "hono/css";
import type { FC } from "hono/jsx";
import Footer from "../components/Footer";
import Header from "../components/Header";

type Props = {
  title: string;
};

const RootLayout: FC<Props> = ({ children, title }) => (
  <html>
    <head>
      {/* CSS Style for Hono */}
      <Style />
      {/* StyleSheets */}
      <StyleSheets />
      {/* Scripts */}
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
    {/* Normalize CSS */}
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
    />
    <link rel="stylesheet" href="static/css/style.css" />
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
