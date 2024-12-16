import k from "knex";
import config from "~/knexfile";

export default function () {
  return k(config);
}
