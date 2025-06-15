exports.up = async function (knex) {
  return knex.schema.createTable('flow', (table) => {
    table.uuid('flowid').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
  

    table.timestamps(true, true); // Adds created_at and updated_at
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists('flow');
};
