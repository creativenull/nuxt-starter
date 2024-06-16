import type { H3Event, EventHandlerRequest } from "h3";
import { type GenericSchema, parseAsync } from "valibot";

export async function useRequestValidator<T extends GenericSchema>(
  event: H3Event<EventHandlerRequest>,
  schema: T,
) {
  const body = await readBody(event);
  return await parseAsync(schema, body);
}
