import { cx } from "hono/css";
import type { FC } from "hono/jsx";
import Spinner from "../Icons/Spinner";
import Text from "../Typography/Text";
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

type Props = {
  fill?: boolean;
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
} & Hono.ButtonHTMLAttributes;

const Button: FC<Props> = ({
  children,
  fill = false,
  icon,
  iconPosition = "right",
  size = "medium",
  isLoading = false,
  disabled = false,
  ...rest
}) => {
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
          <Text as="span" variant="body">
            {children}
          </Text>
          {icon && icon}
        </>
      )}
    </button>
  );
};

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
export default Button;
