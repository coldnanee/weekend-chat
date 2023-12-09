require('dotenv').config({ path: "./config/.env" })

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: `${process.env.SERVER_URL}/api`,
        SOCKET_URL: process.env.SERVER_URL
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com"
            }
        ]
    },
    reactStrictMode: false
}

module.exports = nextConfig
