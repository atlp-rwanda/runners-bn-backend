import { config } from 'dotenv';

config();

module.exports = {
  development: {
    use_env_variable: 'DB_URL',
    url: process.env.DB_URL,
    logging: true,
    dialect: 'postgres',
  },
  test: {
    use_env_variable: 'DB_TEST_URL',
    url: process.env.DB_TEST_URL,
    logging: false,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DB_URL',
    url: process.env.DB_URL,
    logging: false,
    dialect: 'postgres',
  },
};
