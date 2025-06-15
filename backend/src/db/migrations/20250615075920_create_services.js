exports.up = function(knex) {
  return knex.schema.createTable('services', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.string('display_name');
    table.string('auth_type');
    table.string('client_id');
    table.string('client_secret');
    table.string('auth_url');
    table.string('token_url');
    table.string('scopes');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('services');
};
