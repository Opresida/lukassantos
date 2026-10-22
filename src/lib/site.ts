export const NOME = 'Lukas Santos';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lukassantos.vercel.app';
export const DESCRICAO =
  'Lukas Santos, cantor de sertanejo universitário e forronejo de Manaus. Shows com banda completa, acústico e voz e violão para casas de show, festas, casamentos e eventos no Amazonas.';

// Contato para shows (mídia kit 2026, confirmado pelo Humberto em 22/10/2026)
export const WHATSAPP = '5592993539110';
export const TELEFONE = '(92) 99353-9110';
export const EMAIL = 'lksproducao@gmail.com';

export const INSTAGRAM_URL = 'https://www.instagram.com/lukassantos.lks/';
export const INSTAGRAM_ARROBA = '@lukassantos.lks';
export const REEL_URL = 'https://www.instagram.com/reel/DcRZ3ynKL8s/';
export const YOUTUBE_URL = 'https://www.youtube.com/@LukasSantos.cantor';
// Lançamento "Estrada & Saudade" (29/05/2026, selo Sua Música Digital), conferido nas plataformas em 22/10/2026
export const DEEZER_URL = 'https://www.deezer.com/album/991172501';
// Spotify: faixa enviada pelo Humberto em 22/10/2026 → álbum e perfil tirados da página dela
export const SPOTIFY_URL = 'https://open.spotify.com/album/6MXColrJMVWBqQtfZvcnOu';
export const SPOTIFY_ARTISTA_URL = 'https://open.spotify.com/artist/5nKHEWymprxHNLJ1n0SyFt';
export const YOUTUBE_MUSIC_URL = 'https://www.youtube.com/channel/UCcRj-4F6Wy5qd3Z14TYE6XA';
export const BRANDSQUAD_URL = 'https://www.brandsquad.com.br';

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

export const MENSAGEM_PADRAO = 'Olá! Vim pelo site e quero um orçamento de show do Lukas Santos.';
