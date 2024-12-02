import * as v from "valibot";

const schema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.nonEmpty(), v.minLength(255), v.trim()),
    email: v.pipe(v.string(), v.nonEmpty(), v.email(), v.trim()),
    password: v.pipe(v.string(), v.nonEmpty(), v.minLength(8), v.trim()),
    confirm_password: v.pipe(v.string(), v.nonEmpty(), v.minLength(8), v.trim()),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirm_password"]],
      (input) => input.password === input.confirm_password,
      "The passwords do not match.",
    ),
    ["password"],
  ),
);

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
