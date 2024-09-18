import Typography from "ui/Typography";
import type { InputProps } from "./types";
import { css } from "hono/css";

type Props = {
  placeholder: string;
} & InputProps;

export default function TextArea({ label, ...rest }: Props) {
  return (
    <label className={labelStyles}>
      <Typography htmlFor={rest.name}>{label}</Typography>
      <Typography as="textarea" {...rest} />
    </label>
  );
}

const labelStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--size-2);

  & > textarea {
    height: var(--size-11);
    padding: var(--size-3);
    border: var(--border-size-1) solid white;
    background-color: transparent;
    resize: none;
  }
`;
