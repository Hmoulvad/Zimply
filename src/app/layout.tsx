import type { PropsWithChildren } from "hono/jsx";
import StyleSheets from "./_components/StyleSheet";
import Scripts from "./_components/Scripts";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

type Props = PropsWithChildren<{
  title: string;
  description: string;
}>;

export default function RootLayout({ children, title, description }: Props) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <StyleSheets />
        <Scripts />
        <title>{title}</title>
        <meta name="description" content={description} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
