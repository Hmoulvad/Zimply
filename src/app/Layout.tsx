import Footer from "components/Footer";
import Header from "components/Header";
import Scripts from "components/Scripts";
import StyleSheets from "components/StyleSheet";
import type { PropsWithChildren } from "hono/jsx";

type Props = PropsWithChildren<{
  title: string;
}>;

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
