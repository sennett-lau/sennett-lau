/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  jsconfigPaths: true,
  tsconfigPath: true,
  sassOptions: {
    includePaths: [require('path').join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
