import ChevronDown from "../Icons/Chevron/Down";
import Text from "../Typography/Text";
import { containerStyle, labelStyle, selectStyle } from "./styles";

type Props = {
  options: string[];
  label: string;
};

export default function Select({ options, label }: Props) {
  return (
    <div class={containerStyle}>
      <Text className={labelStyle} as="label" variant="label">
        {label}
      </Text>
      <select class={selectStyle}>
        {options.map((option) => (
          <option>{option}</option>
        ))}
      </select>
      <ChevronDown />
    </div>
  );
}
