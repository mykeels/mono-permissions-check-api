import dotenv from "dotenv";

dotenv.config();

/**
 * Environment variables required for all environments (dev, testing, staging, production)
 */
const requiredVariables = ["port", "app_url"];

/**
 * Environment variables required for both staging and production
 */
const productionAndStagingVariables = [];

if (["production", "staging"].includes(process.env.NODE_ENV))
  requiredVariables.push(...productionAndStagingVariables);

const env = {
  app_name: process.env.APP_NAME,
  app_url: process.env.APP_URL,
  api_url: process.env.API_URL,
  port: Number(process.env.PORT),
  app_env: process.env.NODE_ENV || "development",
  api_version: process.env.API_VERSION || "/api/v1",
  get api_prefix() {
    return process.env.API_PREFIX;
  },
};

const missingVariables = requiredVariables.reduce(
  (acc, varName) => (!env[varName] ? acc.concat(varName.toUpperCase()) : acc),
  []
);

if (!!missingVariables.length)
  throw new Error(
    `The following required variables are missing: ${missingVariables}}`
  );

export default env;
