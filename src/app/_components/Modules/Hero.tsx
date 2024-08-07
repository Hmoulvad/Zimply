import { css } from "hono/css";
import { LinkButton } from "../UI/Button";
import Headline from "../UI/Display";
import Typography from "../UI/Typography";
import Display from "../UI/Display";

type Props = {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  subtitle: string;
  link: {
    href: string;
    label: string;
  };
};

export default function Hero({ image, title, subtitle, link }: Props) {
  return (
    <section class={heroStyle}>
      <img src={image.src} alt={image.alt} />
      <div class={contentStyle}>
        <Display>{title}</Display>
        <Typography>{subtitle}</Typography>
        <LinkButton href={link.href}>{link.label}</LinkButton>
      </div>
    </section>
  );
}

const heroStyle = css`
  height: var(--size-15);
  position: relative;
  display: flex;
  padding: var(--size-4);
  align-items: flex-end;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
`;

const contentStyle = css`
  display: flex;
  padding: var(--size-4);
  flex-direction: column;
  gap: var(--size-4);
  width: fit-content;
  max-width: var(--size-15);
  background-color: var(--gray-1);
  border-radius: var(--radius-2);
`;
