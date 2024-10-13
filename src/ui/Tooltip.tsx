import generateId from "utils/generateIds";
import Typography from "./Typography";
import { css, keyframes } from "hono/css";

type Props = {
  content: string;
  message: string;
};

export default function Tooltip({ content, message }: Props) {
  const popoverId = generateId("popover");
  return (
    <>
      <button
        class={tooltipStyle}
        popovertarget={popoverId}
        popovertargetaction="toggle"
      >
        <Typography as="span">{content}</Typography>
      </button>
      <div class={popoverStyle} id={popoverId} popover="auto">
        {message}
      </div>
    </>
  );
}

const tooltipStyle = css`
  cursor: pointer;
  background: none;
  border: none;
  width: fit-content;
  & > span {
    text-decoration: underline;
  }
`;

const backdropFade = keyframes`
  from {
    background-color: transparent;
  }
  to {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const popoverStyle = css`
  position: fixed;
  inset: 0;
  margin: auto;
  border: none;

  &:popover-open {
    display: block;

    &::backdrop {
      background: rgba(0, 0, 0, 0.5);
      animation: ${backdropFade} 0.3s ease-in-out;
    }
  }
`;
