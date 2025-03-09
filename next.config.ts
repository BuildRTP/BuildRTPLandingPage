import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/sponsors',
        destination: 'https://docs.google.com/document/d/1dEY-37KGgcW4orksnGiifpjXin3b1-TKJriyyuOiOiQ/edit?usp=sharing', 
        permanent: false, 
      },
      {
        source: '/hack',
        destination: 'https://scrapyard.hackclub.com/rtp', 
        permanent: false, 
      },
    ];
  },
};

export default nextConfig;
