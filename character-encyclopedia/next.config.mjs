import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "variables.scss";`,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components');
    config.resolve.alias['@styles'] = path.resolve(__dirname, 'styles');
    config.resolve.alias['@queries'] = path.resolve(__dirname, 'queries');
    config.resolve.alias['@lib'] = path.resolve(__dirname, 'lib');
    config.resolve.alias['@utils'] = path.resolve(__dirname, 'utils');
    config.resolve.alias['@hooks'] = path.resolve(__dirname, 'hooks');
    return config;
  },
};

export default nextConfig;
