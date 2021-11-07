/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['next-transpile-modules']); // pass the modules you would like to see transpiled

module.exports = withTM({
  reactStrictMode: true,
});