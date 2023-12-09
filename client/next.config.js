require('dotenv').config({ path: "./config/.env" })

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.STATUS && process.env.STATUS === "production" ? `${process.env.API_VPS_URL}/api` : `${process.env.API_LOCAL_URL}/api`,
        SOCKET_URL: process.env.STATUS && process.env.STATUS === "production" ? process.env.API_VPS_URL : process.env.API_LOCAL_URL
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
