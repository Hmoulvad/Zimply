import type { PropsWithChildren } from "hono/jsx";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Scripts from "./components/Scripts";
import StyleSheets from "./components/StyleSheet";

type Props = {
  title: string;
} & PropsWithChildren;

export default function RootLayout({ children, title }: Props) {
  return (
    <html>
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
