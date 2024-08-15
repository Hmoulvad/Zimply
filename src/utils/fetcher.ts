export default async function fetcher<T>(
  input: string | URL | globalThis.Request,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(input, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: T = await response.json();
  return data;
}
