import type { FC } from "hono/jsx";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Scripts from "./Scripts";
import StyleSheets from "./StyleSheet";
import { htmlStyle } from "./styles";

type Props = {
  title: string;
};

const RootLayout: FC<Props> = ({ children, title }) => (
  <html class={htmlStyle}>
    <head>
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

export default RootLayout;
