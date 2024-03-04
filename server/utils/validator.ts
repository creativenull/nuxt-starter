import type { H3Event, EventHandlerRequest } from "h3";
import { BaseSchema, parseAsync } from "valibot";

export async function useValidator<T extends BaseSchema>(
  event: H3Event<EventHandlerRequest>,
  schema: T,
) {
  const formData = await readFormData(event);
  return await parseAsync(schema, Object.fromEntries(formData));
}

export async function useRequestValidator<T extends BaseSchema>(
  event: H3Event<EventHandlerRequest>,
  schema: T,
) {
  const body = await readBody(event);
  return await parseAsync(schema, body);
}
