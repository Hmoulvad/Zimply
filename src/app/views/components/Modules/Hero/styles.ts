import { css } from "hono/css";

export const heroStyle = css`
  height: var(--size-15);
  position: relative;
  display: flex;
  padding: var(--size-4);
  align-items: flex-end;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
`;

export const contentStyle = css`
  display: flex;
  padding: var(--size-4);
  flex-direction: column;
  gap: var(--size-4);
  width: fit-content;
  max-width: var(--size-15);
  background-color: var(--gray-1);
  border-radius: var(--radius-2);
`;
