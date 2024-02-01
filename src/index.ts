import { Hono } from "hono";
import _api from "_routes/api";
import _app from "_routes/app";

export const app = new Hono();

app.route("/", _app);
app.route("/api", _api);

export default app;
