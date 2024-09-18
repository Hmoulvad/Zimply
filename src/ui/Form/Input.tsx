import { css } from "hono/css";
import type { JSX } from "hono/jsx";
import Typography from "../Typography";

type Props = {
  label: string;
} & JSX.IntrinsicElements["input"];

export default function Input({ label, ...rest }: Props) {
  return (
    <Typography as="label" className={labelStyle}>
      <Typography htmlFor={rest.name}>{label}</Typography>
      <Typography className={inputStyle} as="input" {...rest} />
    </Typography>
  );
}

const labelStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
`;

const inputStyle = css`
  height: var(--size-8);
  padding-inline: var(--size-3);
  border: var(--border-size-1) solid white;
  background-color: transparent;
`;
