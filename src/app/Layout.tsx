import Footer from "app/_components/Footer";
import Header from "app/_components/Header";
import Scripts from "app/_components/Scripts";
import StyleSheets from "app/_components/StyleSheet";
import type { PropsWithChildren } from "hono/jsx";

type Props = {
  title: string;
} & PropsWithChildren;

export default function RootLayout({ children, title }: Props) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
