import { css } from "hono/css";
import type { Child, PropsWithChildren } from "hono/jsx";
import Display from "./Display";
import generateRef from "utils/generateRef";
import Button from "./Button/Button";
import ArrowLeft from "./Icons/Arrow/Left";
import ArrowRight from "./Icons/Arrow/Right";

type Props = {
  title: string;
} & PropsWithChildren;

export default function Carousel({ children, title }: Props) {
  const ref = generateRef();
  return (
    <section x-data class={containerStyle}>
      <header class={headerStyle}>
        <Display as="h2" variant="display2">
          {title}
        </Display>
        <div class={buttonContainerStyle}>
          <Button
            x-on:click={`$refs.${ref}?.scrollTo({ left: 0, behavior: "smooth" })`}
            icon={<ArrowLeft />}
          />
          <Button
            x-on:click={`$refs.${ref}?.scrollTo({ left: $refs.${ref}?.scrollWidth, behavior: "smooth" })`}
            icon={<ArrowRight />}
          />
        </div>
      </header>
      <ol x-ref={ref} class={listStyle}>
        {getChildElements(children)?.map((child) => (
          <li class={listItemStyle}>{child}</li>
        ))}
      </ol>
    </section>
  );
}

function getChildElements(children: Child) {
  if (Array.isArray(children)) {
    return children;
  }
  return [children];
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
`;

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const buttonContainerStyle = css`
  display: flex;
  gap: var(--size-3);
`;

const listStyle = css`
  display: flex;
  gap: var(--size-3);
  list-style: none;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
`;

const listItemStyle = css`
  scroll-snap-align: start;
`;
