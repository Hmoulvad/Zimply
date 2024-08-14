export default function generateHTMXAttributes(prefix = "id") {
  const id = `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  return {
    ["htmx-id"]: id,
    ["htmx-target"]: `#${id}`,
  };
}
