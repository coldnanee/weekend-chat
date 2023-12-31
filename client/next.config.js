require('dotenv').config({ path: "./config/.env" })

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_SERVER_URL: global.process.env.NEXT_PUBLIC_SERVER_URL,
        NEXT_PUBLIC_API_URL: global.process.env.NEXT_PUBLIC_API_URL
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
