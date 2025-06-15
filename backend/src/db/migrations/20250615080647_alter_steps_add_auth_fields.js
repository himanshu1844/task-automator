exports.up = async function(knex) {
  return knex.schema.alterTable('steps', function(table) {
    table.integer('service_id').unsigned().references('id').inTable('services');
    table.integer('auth_token_id').unsigned().references('id').inTable('oauth_tokens');
  });
};

exports.down = async function(knex) {
  return knex.schema.alterTable('steps', function(table) {
    table.dropColumn('service_id');
    table.dropColumn('auth_token_id');
  });
};
