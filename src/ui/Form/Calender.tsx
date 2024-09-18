import Typography from "ui/Typography";
import type { InputProps } from "./types";
import { css } from "hono/css";

type Props = InputProps;

export default function Calender({ label, ...rest }: Props) {
  return (
    <label className={labelStyle}>
      <Typography htmlFor={rest.name}>{label}</Typography>
      <Typography
        defaultValue={new Date().toISOString().split("T")[0]}
        id={rest.name}
        type="date"
        as="input"
        {...rest}
      />
    </label>
  );
}

const labelStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--size-2);

  & > input {
    height: var(--size-8);
    padding-inline: var(--size-3);
    border: var(--border-size-1) solid white;
    background-color: transparent;
    cursor: pointer;

    &::-webkit-inner-spin-button,
    &::-webkit-calendar-picker-indicator {
      position: absolute;
      width: var(--size-4);
      height: var(--size-4);
      position: absolute;
      bottom: var(--size-3);
      right: var(--size-2);
      cursor: pointer;
    }
  }
`;
