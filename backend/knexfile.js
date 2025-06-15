// Update with your config settings.
const { knexSnakeCaseMappers } = require('objection');
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

 
  development: {
    client: 'postgresql',
    connection: {
      database: 'task-automator',
      user:     'postgres',
      password: 'hi@18042004'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'src/db/migrations'
    },
    ...knexSnakeCaseMappers,
  },
};
