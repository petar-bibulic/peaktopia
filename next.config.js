/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'standalone', // use for docker build
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'firebasestorage.googleapis.com',
            },
          ],
        domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
    },
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [
              { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popup"},
          ]
      }
      ]
    }
}

module.exports = nextConfig
