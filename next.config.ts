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
      {
        source: '/event-proposal',
        destination: "https://docs.google.com/document/d/1cF10m0gzHcqdn1xIsuhV4C7XlR2LozKS-uXvVP9GrtE/edit?tab=t.9yeglrig2w0r#heading=h.3j35vko49jjl",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
