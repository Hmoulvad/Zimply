import { css } from "hono/css";

export const baseStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: var(--size-2);
  cursor: pointer;
  width: fit-content;
  background-color: transparent;
  border-radius: var(--radius-2);
  border: var(--border-size-1) solid black;
  transition: background-color 0.2s ease;
  gap: var(--size-2);

  &:hover {
    background-color: var(--gray-2);
  }
`;

export const smallStyle = css`
  height: var(--size-7);

  > svg {
    height: var(--size-4);
    width: var(--size-4);
  }
`;

export const mediumStyle = css`
  height: calc(var(--size-7) + var(--size-2));

  svg {
    height: var(--size-5);
    width: var(--size-5);
  }
`;

export const largeStyle = css`
  height: calc(var(--size-7) + var(--size-3));

  svg {
    height: var(--size-6);
    width: var(--size-6);
  }
`;

export const flexReverseStyle = css`
  flex-direction: row-reverse;
`;

export const disabledStyle = css`
  cursor: default;
  background-color: var(--gray-3);
`;

export const fillStyle = css`
  width: 100%;
`;

export const loadingStyle = css`
  > svg {
    animation: var(--animation-spin);
    color: var(--gray-7);
  }
`;
