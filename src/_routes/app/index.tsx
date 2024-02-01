import { Hono } from "hono";
import ContactPage from "./_views/pages/Contact";
import HomePage from "./_views/pages/Home";

const _app = new Hono();

_app.get("/", (c) => {
  return c.html(<HomePage />);
});

_app.get("/contact", (c) => {
  return c.html(<ContactPage />);
});

export default _app;
