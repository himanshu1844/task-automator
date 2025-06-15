// index.js or index.cjs
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'task-automator',
  password: 'hi@18042004',
  port: 5432,
});

client.connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch(err => console.error('❌ Connection error', err.stack));

module.exports = client;
