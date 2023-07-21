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
    }
}

module.exports = nextConfig
