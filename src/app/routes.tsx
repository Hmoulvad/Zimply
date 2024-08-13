import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import RootLayout from "./Layout";
import HomePage from "./Page";
import UIPage from "./UI/Page";

const appRoutes = new Hono();

// Middleware to add the RootLayout to all routes
appRoutes.use(
  "*",
  jsxRenderer(({ children, title }) => {
    return <RootLayout title={title}>{children}</RootLayout>;
  })
);

// Routes
appRoutes.get("/", (c) => {
  return c.render(<HomePage />, {
    title: "Home Page",
  });
});

appRoutes.get("/ui", (c) => {
  return c.render(<UIPage />, {
    title: "UI Page",
  });
});

export default appRoutes;
