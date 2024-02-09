import { css } from "hono/css";

export const baseStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: var(--size-3);
  cursor: pointer;
  width: fit-content;
  background-color: transparent;
  border-radius: var(--radius-2);
  border: var(--border-size-1) solid black;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--gray-2);
  }
`;

export const smallStyle = css`
  height: var(--size-7);
`;

export const mediumStyle = css`
  height: calc(var(--size-7) + var(--size-2));
`;

export const largeStyle = css`
  height: calc(var(--size-7) + var(--size-3));
`;
