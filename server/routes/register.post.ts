import { ValiError } from "valibot";
import * as userRepo from "../repositories/user.repository";
import { useCsrf } from "../utils/useCsrf";
import { RegisterFormSchema } from "../validators/register-form.schema";

export default defineEventHandler(async (event) => {
  const formDataPromise = readFormData(event);
  const session = await getUserSession(event);

  try {
    const validated = await useValidator(event, RegisterFormSchema);

    if (validated.__csrf !== session.data.csrfToken) {
      throw createError({ statusCode: 403, statusMessage: "Forbidden" });
    }

    if (validated.password !== validated.confirm_password) {
      return await sendRedirect(
        event,
        `/register?password_mismatch=true&name=${validated.name}&email=${validated.email}`,
      );
    }

    const userRecord = userRepo.getByEmail(validated.email);

    if (userRecord) {
      return await sendRedirect(
        event,
        `/register?exists=true&name=${validated.name}&email=${validated.email}`,
      );
    }

    const newUser = await userRepo.create({
      name: validated.name,
      email: validated.email,
      password: validated.password,
    });

    // Create session and login user
    const csrfToken = useCsrf();
    await session.update({ user: newUser, csrfToken });

    return await sendRedirect(event, "/");
  } catch (e) {
    if (e instanceof ValiError) {
      const formData = Object.fromEntries(await formDataPromise);

      return await sendRedirect(
        event,
        `/register?name=${formData.name}&email=${formData.email}&validation_failed=true&reason=${e.message}`,
      );
    }
  }
});
