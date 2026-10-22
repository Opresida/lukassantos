import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import { Abertura } from '@/components/Abertura';
import { BarraContratar } from '@/components/BarraContratar';
import { Cabecalho } from '@/components/Cabecalho';
import { Rodape } from '@/components/Rodape';
import { DESCRICAO, EMAIL, INSTAGRAM_URL, NOME, SITE_URL, SPOTIFY_ARTISTA_URL, TELEFONE, YOUTUBE_URL } from '@/lib/site';
import './globals.css';

// Títulos condensados em itálico, como no mídia kit (a Gobold da logo é paga para web: ela só vive no SVG da marca).
const titulos = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '800', '900'], style: ['normal', 'italic'], variable: '--fonte-titulo', display: 'swap' });
const texto = Barlow({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--fonte-texto', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${NOME} · Sertanejo universitário e forronejo · Manaus`, template: `%s · ${NOME}` },
  description: DESCRICAO,
  applicationName: NOME,
  alternates: { canonical: '/' },
  openGraph: { title: `${NOME} · Contrate o show`, description: DESCRICAO, url: '/', siteName: NOME, type: 'website', locale: 'pt_BR' },
  twitter: { card: 'summary_large_image', title: NOME, description: DESCRICAO },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: '#0B0B0C', colorScheme: 'dark' };

const ARTISTA_LD = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: NOME,
  genre: ['Sertanejo universitário', 'Forronejo'],
  url: SITE_URL,
  image: `${SITE_URL}/fotos/estudio-chapeu.webp`,
  foundingLocation: { '@type': 'Place', name: 'Manaus, AM' },
  email: EMAIL,
  telephone: TELEFONE,
  sameAs: [INSTAGRAM_URL, YOUTUBE_URL, SPOTIFY_ARTISTA_URL],
};

// Antes da pintura: marca que há JS (revelações) e pula a abertura se ela já passou nesta sessão ou se a pessoa
// pediu menos movimento. Assim a cortina nunca pisca para quem não deve vê-la. Trava de segurança: se o React não
// subir (erro, rede), em 6,5 s a cortina sai e tudo aparece, em vez de prender a pessoa numa tela vazia.
const PRE_PINTURA = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('ls-abertura')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('sem-abertura');else d.classList.add('abertura-ativa')}catch(e){d.classList.add('sem-abertura')}setTimeout(function(){if(window.__lsVivo)return;d.classList.remove('abertura-ativa','abertura-saindo');d.classList.add('sem-abertura');d.querySelectorAll('.revela').forEach(function(e){e.classList.add('visivel')})},6500)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${titulos.variable} ${texto.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRE_PINTURA }} />
      </head>
      <body>
        <a href="#conteudo" className="so-leitor so-leitor--foco">Pular para o conteúdo</a>
        <Abertura />
        <Cabecalho />
        <main id="conteudo">{children}</main>
        <Rodape />
        <BarraContratar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTISTA_LD) }} />
      </body>
    </html>
  );
}
