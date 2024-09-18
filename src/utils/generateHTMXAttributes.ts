import generateID from "./generateID";

export default function generateHTMXAttributes(prefix = "id") {
  const id = generateID(prefix);
  return {
    ["htmx-id"]: id,
    ["htmx-target"]: `#${id}`,
  };
}
