exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (roles) => {
      roles.increments("role_id");
      roles.string("rolename", 128).notNullable().unique();
    })
    .createTable("users", (users) => {
      users.increments();
      users.string("username", 255).notNullable().unique();
      users.string("password", 255).notNullable();
      users
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("role_id")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("riddles", (riddles) => {
      riddles.string("id", 255).notNullable().unique();
      riddles.string("riddle", 255).notNullable().unique();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("riddles")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
