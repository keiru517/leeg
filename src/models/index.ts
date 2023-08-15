import { Sequelize } from 'sequelize';
import process from 'process';

const env = process.env.NODE_ENV || 'development';
import configs from '../config/config';
const config = configs[env];

const sequelize = new Sequelize(config);
export default sequelize;
