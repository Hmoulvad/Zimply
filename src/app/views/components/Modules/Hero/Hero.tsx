import { LinkButton } from "../../UI/Button";
import Headline from "../../UI/Typography/Headline";
import Text from "../../UI/Typography/Text";
import { contentStyle, heroStyle } from "./styles";

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
        <Headline>{title}</Headline>
        <Text>{subtitle}</Text>
        <LinkButton href={link.href}>{link.label}</LinkButton>
      </div>
    </section>
  );
}
