import { css } from "hono/css";
import { JSX } from "hono/jsx";
import Typography from "../Typography";

type Props = {
  label: string;
} & JSX.IntrinsicElements["input"];

export default function Input({ label, ...rest }: Props) {
  return (
    <Typography as="label" className={labelStyle}>
      <Typography htmlFor={rest.name}>{label}</Typography>
      <Typography as="input" {...rest} />
    </Typography>
  );
}

const labelStyle = css``;
