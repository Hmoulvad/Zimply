import { cx } from "hono/css";
import type { PropsWithChildren } from "hono/jsx";
import { Button } from "../Button";
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

type Props = {
  ref: string;
  type?: "center" | "aside";
  title: string;
} & PropsWithChildren;

export default function Dialog({
  children,
  ref,
  type = "center",
  title,
}: Props) {
  return (
    <dialog x-ref={ref} class={getDialogStyle(type)}>
      <div class={contentStyle}>
        <header class={headerStyle}>
          <Display as="h3">{title}</Display>
          <Button
            size="small"
            x-on:click="$refs.dialogRef.close()"
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
