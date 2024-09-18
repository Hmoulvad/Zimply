import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import RootLayout from "./layout";
import HomePage from "./page";
import UIPage from "./ui/page";

const appRoutes = new Hono();

appRoutes
  // Middleware to add the RootLayout to all routes
  .use(
    "*",
    jsxRenderer(({ children, title, description }) => {
      return (
        <RootLayout title={title} description={description}>
          {children}
        </RootLayout>
      );
    }),
  )
  // Routes
  .get("/", (c) =>
    c.render(<HomePage />, {
      title: "Home Page",
      description: "This is the home page",
    }),
  )
  .get("/ui", (c) =>
    c.render(<UIPage />, {
      title: "UI Page",
      description: "This is the UI page",
    }),
  );

export default appRoutes;
