const dotenv = require('dotenv');

// eslint-disable-next-line no-unused-vars
module.exports = async ({ options, resolveConfigurationProperty }) => {
  // Load env vars into Serverless environment
  // You can do more complicated env var resolution with dotenv here
  const envVars = dotenv.config({ path: '.env' }).parsed;
  return Object.assign(
    {},
    envVars, // `dotenv` environment variables
    process.env // system environment variables
  );
};
