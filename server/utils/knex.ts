import k from "knex";

export default function knex() {
  const runtimeConfig = useRuntimeConfig();

  return k({
    client: runtimeConfig.databaseDriver,
    useNullAsDefault: true,
    connection: { filename: runtimeConfig.databaseUrl },
  });
}
