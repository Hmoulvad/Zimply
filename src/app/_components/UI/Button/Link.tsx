import { JSX } from "hono/jsx";
import Typography from "../Typography";
import { getButtonStyle } from "./styles";
import { ButtonProps } from "./types";

type Props = ButtonProps & JSX.HTMLAttributes["a"];

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
        <Typography as="span" variant="body">
          {children}
        </Typography>
      ) : null}
      {icon ? icon : null}
    </a>
  );
}
