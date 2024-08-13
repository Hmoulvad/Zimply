import { Hono } from "hono/tiny";
import HomePage from "./Page";
import UIPage from "./UI/Page";

const appRoutes = new Hono();

// Routes
appRoutes.get("/", (c) => {
  return c.html(<HomePage />);
});

appRoutes.get("/ui", (c) => {
  return c.html(<UIPage />);
});

export default appRoutes;
