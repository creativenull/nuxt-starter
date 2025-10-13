import type { FetchError } from "ofetch";

export default function getFormValidationErrors(e: FetchError) {
  const data = Object.values(e.data.data) as { message: string; path: { key: string }[] }[];
  return data.map(({ message, path }) => ({ message, path: path[0].key }));
}
