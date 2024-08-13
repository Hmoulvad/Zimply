import { JSX } from "hono/jsx";
import Spinner from "../Icons/Spinner";
import Typography from "../Typography";
import { getButtonStyle } from "./styles";
import { ButtonProps } from "./types";

type Props = ButtonProps & JSX.IntrinsicElements["button"];

export default function Button({
  children,
  fill = false,
  icon,
  iconPosition = "right",
  size = "medium",
  disabled = false,
  ...rest
}: Props) {
  return (
    <button
      class={getButtonStyle({ size, iconPosition, fill })}
      disabled={disabled}
      {...rest}
    >
      {children ? (
        <Typography as="span" variant="body">
          {children}
        </Typography>
      ) : null}
      {icon ? icon : null}
    </button>
  );
}
