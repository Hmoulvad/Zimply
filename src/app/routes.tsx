import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import RootLayout from "./layout";
import HomePage from "./page";
import UIPage from "./ui/page";
import FormPage from "./form/page";

const appRoutes = new Hono();

appRoutes
  // Middleware to add the RootLayout to all routes
  .use(
    "*",
    jsxRenderer(({ children, title, description, path }) => {
      return (
        <RootLayout title={title} description={description} path={path}>
          {children}
        </RootLayout>
      );
    })
  )
  // Routes
  .get("/", (c) =>
    c.render(<HomePage />, {
      title: "Home Page",
      description: "This is the home page",
      path: "/",
    })
  )
  .get("/ui", (c) =>
    c.render(<UIPage />, {
      title: "UI Page",
      description: "This is the UI page",
      path: "/ui",
    })
  )
  .get("/form", (c) =>
    c.render(<FormPage />, {
      title: "Form Page",
      description: "This is the Form page",
      path: "/form",
    })
  );

export default appRoutes;
