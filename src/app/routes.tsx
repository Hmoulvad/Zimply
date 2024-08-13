import { Hono } from "hono";
import RootLayout from "./Layout";
import HomePage from "./Page";
import UIPage from "./UI/Page";

const appRoutes = new Hono();

// Middleware to add the RootLayout to all routes
appRoutes.use("*", async (c, next) => {
  c.setRenderer((content, head) => {
    return c.html(<RootLayout title={head.title}>{content}</RootLayout>);
  });
  await next();
});

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
