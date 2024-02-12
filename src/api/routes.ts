import { Hono } from "hono";

const apiRoutes = new Hono();

apiRoutes.get("/", (c) => {
  return c.html("Hello, World!");
});

export default apiRoutes;
