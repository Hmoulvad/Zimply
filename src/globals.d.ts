import "typed-htmx";

declare module "hono/jsx" {
  namespace JSX {
    interface HTMLAttributes extends HtmxAttributes {
      children?: Child;
    }
  }
}
declare module "hono" {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      props: { title: string; description: string }
    ): Response;
  }
}

declare module "bun" {
  interface Env {
    BATTLENET_CLIENT_ID: string;
    BATTLENET_CLIENT_SECRET: string;
  }
}
