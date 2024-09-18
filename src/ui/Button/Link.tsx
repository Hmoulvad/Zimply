import type { JSX } from "hono/jsx";
import Typography from "../Typography";
import { getButtonStyle } from "./styles";
import type { ButtonProps } from "./types";

type Props = ButtonProps & JSX.HTMLAttributes["a"];

export default function LinkButton({
  children,
  fill = false,
  icon,
  iconPosition = "right",
  size = "medium",
  ...rest
}: Props) {
  const fallbackTitle = typeof children === "string" ? children : undefined;
  return (
    <a
      title={fallbackTitle}
      class={getButtonStyle({ size, iconPosition, fill })}
      {...rest}
    >
      {children ? (
        <Typography as="span" variant="body">
          {children}
        </Typography>
      ) : null}
      {icon ? icon : null}
    </a>
  );
}
