/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['somemodule', 'and-another']); // pass the modules you would like to see transpiled

module.exports = withTM({
  reactStrictMode: true,
});