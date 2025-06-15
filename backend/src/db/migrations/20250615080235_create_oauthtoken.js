exports.up = function(knex) {
  return knex.schema.createTable('oauth_tokens', function(table) {
    table.increments('id').primary();
   table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.integer('service_id').unsigned().references('id').inTable('services').onDelete('CASCADE');
    table.text('access_token').notNullable();
    table.text('refresh_token');
    table.timestamp('expires_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['user_id', 'service_id', 'access_token']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('oauth_tokens');
};