import type { H3Event, EventHandlerRequest } from "h3";
import { type GenericSchema, parseAsync } from "valibot";

export async function useValidator<T extends GenericSchema>(
  event: H3Event<EventHandlerRequest>,
  schema: T,
) {
  const formData = await readFormData(event);
  return await parseAsync(schema, Object.fromEntries(formData));
}
