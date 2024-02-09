import { Hono } from "hono";

const _api = new Hono();

_api.get("/", (c) => {
  return c.html("Hello, World!");
});

export default _api;
