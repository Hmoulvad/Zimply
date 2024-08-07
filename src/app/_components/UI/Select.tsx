import { css } from "hono/css";
import ChevronDown from "./Icons/Chevron/Down";
import Typography from "./Typography";

type Props = {
  options: string[];
  label: string;
};

export default function Select({ options, label }: Props) {
  return (
    <div class={containerStyle}>
      <Typography className={labelStyle} as="label" variant="label">
        {label}
      </Typography>
      <select class={selectStyle}>
        {options.map((option) => (
          <option>{option}</option>
        ))}
      </select>
      <ChevronDown />
    </div>
  );
}

const containerStyle = css`
  position: relative;
  width: fit-content;

  &:hover {
    background-color: var(--gray-9);
  }

  & > svg {
    width: var(--size-4);
    height: var(--size-4);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: var(--size-2);
  }
`;

const selectStyle = css`
  height: var(--size-8);
  padding-inline: var(--size-2);
  padding-top: var(--size-3);
  appearance: none;
  background-color: transparent;
  border-width: var(--border-size-1);
  border-style: solid;
  border-color: white;
  border-radius: var(--radius-2);
  min-width: var(--size-13);
  cursor: pointer;
`;

const labelStyle = css`
  position: absolute;
  top: var(--size-1);
  left: var(--size-2);
`;
