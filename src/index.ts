import _api from "api";
import _app from "app";
import { Hono } from "hono";

export const app = new Hono();

app.route("/", _app);
app.route("/api", _api);

export default app;
