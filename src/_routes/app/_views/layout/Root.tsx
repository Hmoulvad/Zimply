import { Style } from "hono/css";
import type { FC } from "hono/jsx";
import { css } from "hono/css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { resetStyle } from "../styles/reset.style";

const RootLayout: FC = ({ children }) => (
  <html class={resetStyle}>
    <head>
      <Style />
      <title>Home</title>
    </head>
    <Header />
    <body>{children}</body>
    <Footer />
  </html>
);

export default RootLayout;
