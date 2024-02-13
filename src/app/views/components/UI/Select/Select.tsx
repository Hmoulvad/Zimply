import type { FC } from "hono/jsx";
import Text from "../Typography/Text";
import { containerStyle, labelStyle, selectStyle } from "./styles";

type Props = {
  options: string[];
  label: string;
};

const Select: FC<Props> = ({ options, label }) => (
  <div class={containerStyle}>
    <Text className={labelStyle} as="label" variant="label">
      {label}
    </Text>
    <select class={selectStyle}>
      {options.map((option) => (
        <option>{option}</option>
      ))}
    </select>
  </div>
);

export default Select;
