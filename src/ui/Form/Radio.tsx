import type { InputProps } from "./types";
import Typography from "ui/Typography";
import { css } from "hono/css";
import Dot from "ui/Icons/Dot";

type Props = {
  value: string;
  defaultChecked?: boolean;
} & InputProps;

export default function Radio({ label, name, value, defaultChecked }: Props) {
  return (
    <label className={labelStyles}>
      <Typography htmlFor={name}>{label}</Typography>
      <input
        defaultChecked={defaultChecked}
        value={value}
        type="radio"
        name={name}
      />
      <span className={radioStyles}>
        <Dot />
      </span>
    </label>
  );
}

const labelStyles = css`
  position: relative;
  display: flex;
  gap: var(--size-2);
  cursor: pointer;
  height: var(--size-6);
  align-items: center;
  flex-direction: row-reverse;
  justify-content: flex-end;

  & > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  & > input:checked ~ .radio {
    background-color: white;
    & > svg {
      opacity: 1;
    }
  }

  & > input:focus ~ .radio {
    outline: var(--border-size-3) auto -webkit-focus-ring-color;
  }
`;

const radioStyles = css`
  width: var(--size-4);
  height: var(--size-4);
  border-radius: var(--radius-round);
  background-color: transparent;
  border: var(--border-size-1) solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  & > svg {
    opacity: 0;
    transition: opacity 0.2s;
    width: var(--size-4);
    height: var(--size-4);
    fill: black;
  }
`;
