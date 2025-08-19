import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/eventproposal',
        destination: 'https://docs.google.com/document/d/1cF10m0gzHcqdn1xIsuhV4C7XlR2LozKS-uXvVP9GrtE/edit?tab=t.9yeglrig2w0r#heading=h.3j35vko49jjl',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
