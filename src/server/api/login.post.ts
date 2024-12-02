import * as v from "valibot";

const schema = v.object({
  email: v.pipe(v.string(), v.nonEmpty(), v.email(), v.trim()),
  password: v.pipe(v.string(), v.nonEmpty(), v.trim()),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => v.safeParse(schema, body));

  if (!body.success) {
    throw createError({
      statusCode: 422,
      statusMessage: "Validation error",
      data: v.flatten<typeof schema>(body.issues),
    });
  }

  return body;
});
