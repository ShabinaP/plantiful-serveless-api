require('dotenv').config
const DOMAIN = process.env.MAIL_GUN_DOMAIN
const API = process.env.MAIL_GUN_API

module.exports = () => {
    const emailConfig = {
      apiKey: API,
      domain: DOMAIN
    };
  return emailConfig;
  };