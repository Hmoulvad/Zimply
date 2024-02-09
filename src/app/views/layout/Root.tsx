import type { FC } from "hono/jsx";
import { Style } from "hono/css";
import Footer from "../components/Footer";
import { resetStyle } from "./styles";
import Header from "../components/Header";

type Props = {
  title: string;
};

const RootLayout: FC<Props> = ({ children, title }) => (
  <html class={resetStyle}>
    <head>
      <Style />
      {/* <script
        defer
        src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
      />
      <script
        src="https://unpkg.com/htmx.org@1.9.10"
        integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
        crossorigin="anonymous"
      /> */}
      <link rel="stylesheet" href="https://unpkg.com/open-props" />
      <title>{title}</title>
    </head>
    <body>
      <Header />
      {children}
      <Footer />
    </body>
  </html>
);

export default RootLayout;
