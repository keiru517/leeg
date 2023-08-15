import { writeFileSync } from 'fs';
import { Options } from 'sequelize';
import { absolutePath } from '../helpers';

const options: { [key: string]: Options } = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || undefined,
    database: process.env.DB_NAME || 'leeg',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || undefined,
    database: process.env.DB_NAME || 'react-node-typescript',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || undefined,
    database: process.env.DB_NAME || 'react-node-typescript',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
  }
};
writeFileSync(absolutePath('src/config/config.json'), JSON.stringify(options));

export default options;
