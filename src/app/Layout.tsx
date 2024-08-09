import Footer from "app/_components/Footer";
import Header from "app/_components/Header";
import type { PropsWithChildren } from "hono/jsx";
import StyleSheets from "app/_components/StyleSheet";
import Scripts from "app/_components/Scripts";

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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
