import { css, cx } from "hono/css";
import { ButtonProps } from "./types";

export function getButtonStyle({
  size,
  fill,
  iconPosition,
}: Required<Pick<ButtonProps, "fill" | "size" | "iconPosition">>) {
  let args = [baseStyle];
  switch (size) {
    case "small":
      args.push(smallStyle);
      break;
    case "medium":
      args.push(mediumStyle);
      break;
  }
  if (iconPosition === "left") args.push(flexReverseStyle);
  if (fill) args.push(fillStyle);

  return cx(...args);
}

const baseStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: var(--size-2);
  cursor: pointer;
  width: fit-content;
  background-color: transparent;
  border-width: var(--border-size-1);
  border-style: solid;
  transition: background-color 0.2s ease;
  gap: var(--size-2);
  color: inherit;
  text-decoration: none;

  &:hover {
    background-color: var(--gray-9);
  }
`;

const smallStyle = css`
  height: var(--size-7);
  > svg {
    height: var(--size-4);
    width: var(--size-4);
  }
`;

const mediumStyle = css`
  height: var(--size-8);
  svg {
    height: var(--size-5);
    width: var(--size-5);
  }
`;

const flexReverseStyle = css`
  flex-direction: row-reverse;
`;

const fillStyle = css`
  width: 100%;
`;
