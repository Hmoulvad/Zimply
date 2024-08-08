import { css, keyframes } from "hono/css";

const backdropFade = keyframes`
  from {
    background-color: transparent;
  }
  to {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const dialogStyle = css`
  display: grid;
  position: fixed;
  inset: 0;
  border: none;
  max-height: 100vh;
  padding: var(--size-3);
  box-shadow: var(--shadow-3);

  &[open] {
    &::backdrop {
      animation: ${backdropFade} 0.4 ease forwards;
    }
  }
`;

export const centerStyle = css`
  border-radius: var(--radius-2);
  width: var(--size-15);
  height: var(--size-15);
  max-width: 80vw;
  max-height: 80vh;
  margin: auto;
  transform: scale(0);
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease;

  &[open] {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }
`;

export const asideStyle = css`
  margin-left: auto;
  height: 100vh;
  width: var(--size-15);
  transform: translateX(100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease;

  &[open] {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }

  @media only screen and (max-width: 480px) {
    width: 100vw;
    height: 80vh;
    margin-inline: 0;
    margin-top: auto;
    transform: translateY(100%);
    max-width: 100vw;

    &[open] {
      transform: translateY(0);
    }
  }
`;

export const contentStyle = css`
  display: grid;
  grid-template-rows: auto 1fr;
`;

export const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const sectionStyle = css`
  display: grid;
`;
