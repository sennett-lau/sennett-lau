/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: false,
  sassOptions: {
    includePaths: [require('path').join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
