import type { PropsWithChildren } from "hono/jsx";
import Breadcrumbs from "ui/Breadcrumbs";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Scripts from "./_components/Scripts";
import StyleSheets from "./_components/StyleSheet";

type Props = PropsWithChildren<{
  title: string;
  description: string;
  path: string;
}>;

export default function RootLayout({
  children,
  title,
  description,
  path,
}: Props) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <StyleSheets />
        <Scripts />
      </head>
      <body>
        <Header />
        <main>
          <Breadcrumbs path={path} />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
