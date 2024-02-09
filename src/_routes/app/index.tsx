import { Hono } from "hono";
import HomePage from "./_views/pages/Home";
import UIPage from "./_views/pages/UI";

const _app = new Hono();

_app.get("/", (c) => {
  return c.html(<HomePage />);
});

_app.get("/ui", (c) => {
  return c.html(<UIPage />);
});

export default _app;
