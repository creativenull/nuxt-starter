import * as t from "drizzle-orm/sqlite-core";

export const timestamps = {
  createdOn: t
    .integer()
    .notNull()
    .$default(() => new Date().getUTCMilliseconds()),
  updatedOn: t.integer(),
};
