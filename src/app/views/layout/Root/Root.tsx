import type { PropsWithChildren } from "hono/jsx";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Scripts from "./Scripts";
import StyleSheets from "./StyleSheet";
import { htmlStyle } from "./styles";

type Props = {
  title: string;
} & PropsWithChildren;

export default function RootLayout({ children, title }: Props) {
  return (
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
}
