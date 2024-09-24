import { css } from "hono/css";
import Check from "ui/Icons/Check";
import Typography from "ui/Typography";
import type { InputProps } from "./types";

type Props = {
  defaultChecked?: boolean;
  value?: string;
} & InputProps;

export default function Checkbox({
  name,
  label,
  value,
  defaultChecked,
}: Props) {
  return (
    <label className={labelStyle}>
      <Typography htmlFor={name}>{label}</Typography>
      <input
        defaultChecked={defaultChecked}
        value={value}
        type="checkbox"
        name={name}
      />
      <span className={checkboxStyle}>
        <Check />
      </span>
    </label>
  );
}

const labelStyle = css`
  position: relative;
  display: flex;
  gap: var(--size-2);
  cursor: pointer;
  height: var(--size-8);
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

  & > input:checked ~ span {
    background-color: white;
    & > svg {
      opacity: 1;
    }
  }

  & > input:focus ~ span {
    outline: var(--border-size-3) auto -webkit-focus-ring-color;
  }
`;

const checkboxStyle = css`
  width: var(--size-4);
  height: var(--size-4);
  background-color: transparent;
  border: var(--border-size-1) solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  & > svg {
    opacity: 0;
    transition: opacity 0.2s;
    width: var(--size-3);
    height: var(--size-3);
    fill: black;
  }
`;
