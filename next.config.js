/** @type {import('next').NextConfig} */
//import i18n from './next-i18next.config';
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  i18n
}

module.exports = nextConfig;
