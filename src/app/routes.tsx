import { Hono } from "hono/tiny";
import HomePage from "./_pages/Home";
import UIPage from "./_pages/UI";

const appRoutes = new Hono();

appRoutes.get("/", (c) => {
  return c.html(<HomePage />);
});

appRoutes.get("/ui", (c) => {
  return c.html(<UIPage />);
});

export default appRoutes;
