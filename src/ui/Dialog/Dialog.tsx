import { cx } from "hono/css";
import type { PropsWithChildren } from "hono/jsx";
import Button from "../Button/Button";
import Display from "../Display";
import X from "../Icons/X";
import {
  asideStyle,
  centerStyle,
  contentStyle,
  dialogStyle,
  headerStyle,
  sectionStyle,
} from "./styles";
import generateID from "utils/generateID";

type Props = PropsWithChildren<{
  ref: string;
  type?: "center" | "aside";
  title: string;
}>;

export default function Dialog({
  children,
  ref,
  type = "center",
  title,
}: Props) {
  const id = generateID("dialog");
  return (
    <dialog
      id={id}
      x-ref={ref}
      x-on:click={`$event.target.id === '${id}' ? $refs.${ref}?.close() : null`}
      class={getDialogStyle(type)}
    >
      <div class={contentStyle}>
        <header class={headerStyle}>
          <Display as="h3">{title}</Display>
          <Button
            size="small"
            x-on:click={`$refs.${ref}?.close()`}
            icon={<X />}
          />
        </header>
        <section class={sectionStyle}>{children}</section>
      </div>
    </dialog>
  );
}

function getDialogStyle(type: Props["type"]) {
  let styles = [dialogStyle];
  styles.push(type === "center" ? centerStyle : asideStyle);
  return cx(...styles);
}
