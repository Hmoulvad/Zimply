import apiRoutes from "api/routes";
import appRoutes from "app/routes";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use(
  "/static/*",
  serveStatic({
    root: "/",
    onNotFound: (path, c) => {
      console.log(`${path} is not found, you access ${c.req.path}`);
    },
  })
);
app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));
app.route("/", appRoutes);
app.route("/api", apiRoutes);

export default app;
