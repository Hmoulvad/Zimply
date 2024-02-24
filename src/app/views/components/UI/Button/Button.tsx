import { cx } from "hono/css";
import Spinner from "../Icons/Spinner";
import Text from "../Typography/Text/Text";
import {
  baseStyle,
  disabledStyle,
  fillStyle,
  flexReverseStyle,
  largeStyle,
  loadingStyle,
  mediumStyle,
  smallStyle,
} from "./styles";
import { ButtonProps } from "./types";

type Props = ButtonProps & Hono.ButtonHTMLAttributes;

export default function Button({
  children,
  fill = false,
  icon,
  iconPosition = "right",
  size = "medium",
  isLoading = false,
  disabled = false,
  ...rest
}: Props) {
  return (
    <button
      class={getButtonStyle({ size, iconPosition, fill, isLoading, disabled })}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {children ? (
            <Text as="span" variant="body">
              {children}
            </Text>
          ) : null}
          {icon ? icon : null}
        </>
      )}
    </button>
  );
}

function getButtonStyle({
  size,
  fill,
  iconPosition,
  isLoading,
  disabled,
}: Required<
  Pick<Props, "fill" | "size" | "iconPosition" | "isLoading" | "disabled">
>) {
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
  if (isLoading) {
    args.push(loadingStyle);
    args.push(disabledStyle);
  }
  if (disabled) args.push(disabledStyle);

  return cx(...args);
}
