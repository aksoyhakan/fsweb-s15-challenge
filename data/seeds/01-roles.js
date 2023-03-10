/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const roleData = [
  { rolename: "admin" },
  { rolename: "user" },
  { rolename: "student" },
];

exports.roleData = roleData;

exports.seed = async function (knex) {
  return await knex("roles").insert(roleData);
};
