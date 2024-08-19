import Button from "components/UI/Button/Button";
import generateHTMXAttributes from "utils/generateHTMXAttributes";

export default function BattlenetPage() {
  const api = generateHTMXAttributes("user");
  return (
    <>
      <Button
        hx-get="/api/battlenet/auth"
        hx-swap="innerHTML"
        hx-target={api["htmx-target"]}
      >
        Get API keys
      </Button>
      <div id={api["htmx-id"]}></div>
    </>
  );
}
