import Image from 'next/image';
import { BRANDSQUAD_URL, EMAIL, INSTAGRAM_ARROBA, INSTAGRAM_URL, linkWhatsApp, MENSAGEM_PADRAO, SPOTIFY_ARTISTA_URL, TELEFONE, YOUTUBE_URL } from '@/lib/site';
import { IconeEmail, IconeInstagram, IconeSpotify, IconeWhatsApp, IconeYouTube } from './Icones';
import { Logo } from './Logo';

export function Rodape() {
  return (
    <footer id="rodape" className="rodape">
      <div className="rodape__faixa" aria-hidden="true" />
      <div className="rodape__grade conteudo">
        <div className="rodape__marca">
          <Logo className="rodape__logo" />
          <p>Sertanejo universitário e forronejo.<br />Manaus, Amazonas.</p>
        </div>
        <div className="rodape__bloco">
          <h2 className="rodape__titulo">Contato para shows</h2>
          <ul className="rodape__lista">
            <li><a href={linkWhatsApp(MENSAGEM_PADRAO)} target="_blank" rel="noopener noreferrer"><IconeWhatsApp /> {TELEFONE}</a></li>
            <li><a href={`mailto:${EMAIL}`}><IconeEmail /> {EMAIL}</a></li>
          </ul>
        </div>
        <div className="rodape__bloco">
          <h2 className="rodape__titulo">Siga</h2>
          <ul className="rodape__lista">
            <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><IconeInstagram /> {INSTAGRAM_ARROBA}</a></li>
            <li><a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"><IconeYouTube /> YouTube</a></li>
            <li><a href={SPOTIFY_ARTISTA_URL} target="_blank" rel="noopener noreferrer"><IconeSpotify /> Spotify</a></li>
          </ul>
        </div>
        <div className="rodape__bloco rodape__producao">
          <h2 className="rodape__titulo">Produção</h2>
          <Image src="/marca/lks-producoes.png" alt="LKS Produções & Eventos" width={1068} height={468} sizes="160px" className="rodape__lks" />
        </div>
      </div>
      <div className="rodape__base conteudo">
        <span>© {new Date().getFullYear()} Lukas Santos. Todos os direitos reservados.</span>
        <a href={BRANDSQUAD_URL} target="_blank" rel="noopener">Site por BrandSquad</a>
      </div>
    </footer>
  );
}
