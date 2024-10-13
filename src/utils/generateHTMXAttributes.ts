import generateId from "./generateIds";

export default function generateHTMXAttributes(prefix = "id") {
  const id = generateId(prefix);
  return {
    ["htmx-id"]: id,
    ["htmx-target"]: `#${id}`,
  };
}
