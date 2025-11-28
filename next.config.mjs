/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...
  images: {
    remotePatterns: [
      // 1. Konfigurasi untuk Backend Lokal (DEVELOPMENT ONLY)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**', 
      },
      // 2. Konfigurasi untuk CLOUDINARY (PRODUCTION)
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Hostname default Cloudinary
        // atau jika menggunakan custom domain, gunakan domain Anda
      },
    ],
  },
};

export default nextConfig;