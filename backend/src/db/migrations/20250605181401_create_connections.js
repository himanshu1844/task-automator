exports.up = async function (knex) {
  return knex.schema.createTable('connections', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('key').notNullable();
    table.string('display_name').notNullable();
    table.text('data').notNullable();
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.boolean('verified').defaultTo(false);

    table.timestamps(true, true); // Adds created_at and updated_at
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists('connections');
};
