import bcrypt from "bcrypt";

export async function makePassword(plainTextPassword: string): Promise<string> {
  const saltRounds = parseInt(process.env.NUXT_BCRYPT_SALT_ROUND ?? "12", 10);
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(plainTextPassword, salt);

  return hashedPassword;
}

export async function comparePassword(
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}
