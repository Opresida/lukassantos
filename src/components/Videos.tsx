'use client';
import Image from 'next/image';
import { useState } from 'react';
import type { Video } from '@/data/conteudo';
import { Carregando } from './Carregando';
import { IconePlay } from './Icones';

/** Palco de vídeos: um player grande + a fila dos outros covers. O YouTube só é carregado quando a pessoa aperta o
 *  play (capa leve até lá: a página não baixa os ~800 KB do player por vídeo). */
export function Videos({ videos }: { videos: Video[] }) {
  const [atual, setAtual] = useState(0);
  const [tocando, setTocando] = useState(false);
  const [pronto, setPronto] = useState(false);
  const v = videos[atual];

  const escolhe = (i: number) => {
    setAtual(i);
    setPronto(false);
    setTocando(true);
    document.getElementById('player')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <div className="videos">
      <div className="videos__player" id="player">
        {tocando ? (
          <>
            {!pronto && <span className="videos__carregando"><Carregando tamanho={64} texto="Carregando o vídeo" /></span>}
            <iframe
              key={v.id}
              src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={`Lukas Santos — ${v.titulo} (cover)`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              onLoad={() => setPronto(true)}
            />
          </>
        ) : (
          <button type="button" className="videos__capa" onClick={() => setTocando(true)} aria-label={`Tocar ${v.titulo} (cover)`}>
            <Image src={`/fotos/video-${v.id}.webp`} alt="" fill sizes="(min-width: 1024px) 66vw, 100vw" />
            <span className="videos__play" aria-hidden="true"><IconePlay /></span>
            <span className="videos__legenda">
              <span className="videos__tag">Cover ao vivo</span>
              <span className="videos__titulo">{v.titulo}</span>
            </span>
          </button>
        )}
      </div>
      <ol className="videos__fila" aria-label="Escolha o vídeo">
        {videos.map((x, i) => (
          <li key={x.id}>
            <button type="button" className="videos__item" aria-current={i === atual ? 'true' : undefined} onClick={() => escolhe(i)}>
              <span className="videos__mini">
                <Image src={`/fotos/video-${x.id}.webp`} alt="" fill sizes="(min-width: 1024px) 16vw, 45vw" />
                <span className="videos__mini-play" aria-hidden="true"><IconePlay /></span>
              </span>
              <span className="videos__item-texto">
                <span className="videos__num">0{i + 1}</span>
                <span>{x.musicas}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
