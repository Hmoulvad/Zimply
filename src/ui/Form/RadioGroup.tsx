import Typography from "ui/Typography";
import Radio from "./Radio";
import type { InputProps } from "./types";
import { css } from "hono/css";

type Props = {
  options: Omit<Parameters<typeof Radio>["0"], "name">[];
} & InputProps;

export default function RadioGroup({ label, name, options }: Props) {
  return (
    <div className={radioGroupStyles}>
      <Typography>{label}</Typography>
      {options.map((option) => (
        <Radio name={name} {...option} />
      ))}
    </div>
  );
}

const radioGroupStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
`;
