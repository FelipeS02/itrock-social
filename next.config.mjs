/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
