import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lukas Santos', short_name: 'Lukas Santos', description: 'Sertanejo universitário e forronejo. Contrate o show.',
    start_url: '/', display: 'standalone', background_color: '#0B0B0C', theme_color: '#0B0B0C',
    icons: [{ src: '/marca/icone-512.png', sizes: '512x512', type: 'image/png' }],
  };
}
