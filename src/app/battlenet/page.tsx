import Button from "components/UI/Button/Button";
import generateHTMXAttributes from "utils/generateHTMXAttributes";

export default function BattlenetPage() {
  const battlenet = generateHTMXAttributes("battlenet");
  return (
    <>
      <Button
        hx-get="/api/battlenet/wow/classes"
        hx-swap="innerHTML"
        hx-target={battlenet["htmx-target"]}
      >
        Get Playable Classes
      </Button>
      <div id={battlenet["htmx-id"]}></div>
    </>
  );
}
