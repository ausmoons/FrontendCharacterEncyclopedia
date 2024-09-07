/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components');
    config.resolve.alias['@styles'] = path.resolve(__dirname, 'styles');
    config.resolve.alias['@queries'] = path.resolve(__dirname, 'queries');
    config.resolve.alias['@lib'] = path.resolve(__dirname, 'lib');
    config.resolve.alias['@utils'] = path.resolve(__dirname, 'utils');
    return config;
  },
};

module.exports = nextConfig;