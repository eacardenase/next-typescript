/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['react.semantic-ui.com'],
    },
};

module.exports = nextConfig;
