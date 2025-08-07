const fs = require('fs');
const path = require('path');

const envConfig = {
  development: {
    FINERACT_API_URLS: 'https://core-dev.betterfinco.com',
    FINERACT_API_URL: 'https://core-dev.betterfinco.com',
    TENANT_ID: 'default',
    TENANT_IDS: 'default'
  },
  staging: {
    FINERACT_API_URLS: 'https://core-stage.betterfinco.com',
    FINERACT_API_URL: 'https://core-stage.betterfinco.com',
    TENANT_ID: 'stage',
    TENANT_IDS: 'stage'
  },
  production: {
    FINERACT_API_URLS: 'https://core.betterfinco.com',
    FINERACT_API_URL: 'https://core.betterfinco.com',
    TENANT_ID: 'default',
    TENANT_IDS: 'default'
  }
};

const targetEnv = process.env.TARGET_ENV || 'production';
const config = envConfig[targetEnv];

const template = `(function (window) {
  window["env"] = window["env"] || {};
  window["env"]["fineractApiUrls"] = '${config.FINERACT_API_URLS}';
  window["env"]["fineractApiUrl"] = '${config.FINERACT_API_URL}';
  window["env"]["apiProvider"] = '';
  window["env"]["apiVersion"] = '';
  window["env"]["fineractPlatformTenantId"] = '${config.TENANT_ID}';
  window["env"]["fineractPlatformTenantIds"] = '${config.TENANT_IDS}';
  window["env"]["defaultLanguage"] = '';
  window["env"]["supportedLanguages"] = '';
})(this);
`;

fs.writeFileSync(path.resolve(__dirname, '../src/assets/env.js'), template);
console.log(`env.js generated for ${targetEnv}`);
