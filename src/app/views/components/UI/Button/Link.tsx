import { cx } from "hono/css";
import Text from "../Typography/Text/Text";
import {
  baseStyle,
  fillStyle,
  flexReverseStyle,
  largeStyle,
  mediumStyle,
  smallStyle,
} from "./styles";
import { ButtonProps } from "./types";

type Props = ButtonProps & Hono.AnchorHTMLAttributes;

export default function LinkButton({
  children,
  fill = false,
  icon,
  iconPosition = "right",
  size = "medium",
  ...rest
}: Props) {
  return (
    <a class={getButtonStyle({ size, iconPosition, fill })} {...rest}>
      {children ? (
        <Text as="span" variant="body">
          {children}
        </Text>
      ) : null}
      {icon ? icon : null}
    </a>
  );
}

function getButtonStyle({
  size,
  fill,
  iconPosition,
}: Required<Pick<Props, "fill" | "size" | "iconPosition">>) {
  let args = [baseStyle];
  switch (size) {
    case "small":
      args.push(smallStyle);
      break;
    case "medium":
      args.push(mediumStyle);
      break;
    case "large":
      args.push(largeStyle);
      break;
  }
  if (iconPosition === "left") args.push(flexReverseStyle);
  if (fill) args.push(fillStyle);

  return cx(...args);
}
