import { Sequelize } from 'sequelize';

const db = new Sequelize(
  'node-course', // DB
  'root', // User
  'root',// Password
  {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 8889
  }
);

export default db;