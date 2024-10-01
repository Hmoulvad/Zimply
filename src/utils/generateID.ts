export default function generateId(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}
