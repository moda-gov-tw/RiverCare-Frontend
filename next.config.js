/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone"
}

module.exports = {
  ...nextConfig,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://rivercare.imlab.app/api/:path*`
      }
    ]
  }
}
