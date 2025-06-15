exports.up = async function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')); // PostgreSQL UUID
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('role').defaultTo('user');

    table.timestamps(true, true); // created_at and updated_at
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists('users');
};