import { css } from "hono/css";

export const containerStyle = css`
  position: relative;
  width: fit-content;

  & > svg {
    width: var(--size-4);
    height: var(--size-4);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: var(--size-2);
  }
`;

export const selectStyle = css`
  height: var(--size-8);
  padding-inline: var(--size-2);
  padding-top: var(--size-3);
  appearance: none;
  background-color: transparent;
  border: var(--border-size-1) solid black;
  border-radius: var(--radius-2);
  min-width: var(--size-13);
`;

export const labelStyle = css`
  position: absolute;
  top: var(--size-1);
  left: var(--size-2);
`;
