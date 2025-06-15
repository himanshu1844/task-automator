exports.up = function(knex) {
  return knex.schema.createTable('steps', function(table) {
    table.increments('id').primary();
    table.uuid('flow_id').references('flowid').inTable('flow').onDelete('CASCADE');
    table.integer('order_index');
    table.string('type');
    table.json('config');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('steps');
};
