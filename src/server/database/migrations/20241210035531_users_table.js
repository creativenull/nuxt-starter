/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("users", (t) => {
    t.increments();
    t.string("pid", 128).notNullable();
    t.string("first_name", 128).notNullable();
    t.string("last_name", 128).notNullable();
    t.string("email", 128).notNullable().unique();
    t.string("password", 64).notNullable();
    t.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("users");
};
