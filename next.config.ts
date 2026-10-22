import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // conferência visual pelo Playwright em 127.0.0.1 (o dev bloqueia os arquivos internos para outra origem)
  allowedDevOrigins: ['127.0.0.1'],
};

export default nextConfig;
