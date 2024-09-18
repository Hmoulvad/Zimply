import { css } from "hono/css";
import ChevronDown from "ui/Icons/Chevron/Down";
import Typography from "ui/Typography";
import type { InputProps } from "./types";

type Props = {
  options: string[];
} & InputProps;

export default function Select({ options, label, name }: Props) {
  return (
    <label className={labelStyle}>
      <Typography htmlFor={name}>{label}</Typography>
      <Typography as="select" id={name} name={name}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Typography>
      <ChevronDown />
    </label>
  );
}

const labelStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--size-2);

  & > select {
    height: var(--size-8);
    appearance: none;
    padding-left: var(--size-3);
    padding-right: calc(var(--size-3) * 2);
    border: var(--border-size-1) solid white;
    background-color: transparent;
    cursor: pointer;
    border-radius: 0;
  }

  & > svg {
    width: var(--size-4);
    height: var(--size-4);
    position: absolute;
    bottom: var(--size-3);
    right: var(--size-2);
    cursor: pointer;
  }
`;
