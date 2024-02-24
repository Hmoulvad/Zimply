import Grid from "../components/Grid";
import Hero from "../components/Modules/Hero/Hero";
import RootLayout from "../layout/Root";

export default function HomePage() {
  return (
    <RootLayout title="HomePage">
      <main>
        <Grid
          columns={[
            {
              span: 4,
              children: (
                <Hero
                  image={{
                    src: "https://i.imgur.com/iKlaWhg.png",
                    alt: "HonoJS",
                  }}
                  title="HonoJS"
                  subtitle="A modern web framework for building web applications with TypeScript and JSX"
                  link={{
                    href: "https://hono.dev",
                    label: "Learn more",
                  }}
                />
              ),
            },
            {
              span: 4,
              children: (
                <Hero
                  image={{
                    src: "https://i.imgur.com/iKlaWhg.png",
                    alt: "HonoJS",
                  }}
                  title="HonoJS"
                  subtitle="A modern web framework for building web applications with TypeScript and JSX"
                  link={{
                    href: "https://hono.dev",
                    label: "Learn more",
                  }}
                />
              ),
            },
            {
              span: 4,
              children: (
                <Hero
                  image={{
                    src: "https://i.imgur.com/iKlaWhg.png",
                    alt: "HonoJS",
                  }}
                  title="HonoJS"
                  subtitle="A modern web framework for building web applications with TypeScript and JSX"
                  link={{
                    href: "https://hono.dev",
                    label: "Learn more",
                  }}
                />
              ),
            },
            {
              span: 8,
              children: (
                <Hero
                  image={{
                    src: "https://i.imgur.com/iKlaWhg.png",
                    alt: "HonoJS",
                  }}
                  title="HonoJS"
                  subtitle="A modern web framework for building web applications with TypeScript and JSX"
                  link={{
                    href: "https://hono.dev",
                    label: "Learn more",
                  }}
                />
              ),
            },
            {
              span: 4,
              children: (
                <Hero
                  image={{
                    src: "https://i.imgur.com/iKlaWhg.png",
                    alt: "HonoJS",
                  }}
                  title="HonoJS"
                  subtitle="A modern web framework for building web applications with TypeScript and JSX"
                  link={{
                    href: "https://hono.dev",
                    label: "Learn more",
                  }}
                />
              ),
            },
          ]}
        />
      </main>
    </RootLayout>
  );
}
