import type { PropsWithChildren } from "hono/jsx";
import { detailsStyle, summaryStyle } from "./styles";
import Text from "../Typography/Text";

type Props = {
  title: string;
} & PropsWithChildren;

export default function Accordion({ title, children }: Props) {
  return (
    <details class={detailsStyle}>
      <Text as="summary" className={summaryStyle}>
        {title}
      </Text>
      {children}
    </details>
  );
}
