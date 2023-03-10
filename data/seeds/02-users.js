/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const userData = [
  { username: "aksoyhakan", password: "Deneme+11", role_id: 1 },
  { username: "yontermel", password: "Hüseyin+22", role_id: 2 },
  { username: "kabakoz", password: "Ankara+06", role_id: 3 },
];

exports.userData = userData;

exports.seed = async function (knex) {
  return await knex("users").insert(userData);
};
