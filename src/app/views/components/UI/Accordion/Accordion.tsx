import type { FC } from "hono/jsx";
import { detailsStyle, summaryStyle } from "./styles";
import Text from "../Typography/Text";

type Props = {
  title: string;
};

const Accordion: FC<Props> = ({ title, children }) => (
  <details class={detailsStyle}>
    <Text as="summary" className={summaryStyle}>
      {title}
    </Text>
    {children}
  </details>
);

export default Accordion;
