import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import RootLayout from "./Layout";
import HomePage from "./Page";
import UIPage from "./UI/Page";

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
    })
  )
  // Routes
  .get("/", (c) => {
    return c.render(<HomePage />, {
      title: "Home Page",
      description: "This is the home page",
    });
  })
  .get("/ui", (c) => {
    return c.render(<UIPage />, {
      title: "UI Page",
      description: "This is the UI page",
    });
  });

export default appRoutes;
