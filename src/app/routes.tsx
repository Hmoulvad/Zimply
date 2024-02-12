import { Hono } from "hono";
import HomePage from "./views/pages/Home";
import UIPage from "./views/pages/UI";

const appRoutes = new Hono();

appRoutes.get("/", (c) => {
  return c.html(<HomePage />);
});

appRoutes.get("/ui", (c) => {
  return c.html(<UIPage />);
});

export default appRoutes;
