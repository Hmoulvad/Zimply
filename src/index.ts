import apiRoutes from "api/routes";
import appRoutes from "app/routes";
import { Hono } from "hono";

const app = new Hono();

app.route("/", appRoutes).route("/api", apiRoutes);

export default app;
