'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Vídeo de fundo do topo (07/11/2026): 18 s em loop, sem som, montados dos 4 covers profissionais do canal do Lukas
 * (fonte e planos em `D:\CLIENTES BRANDSQUADS\Lukas Santos\Videos YouTube\hero\planos.txt`). Duas versões com o
 * enquadramento refeito para cada tela: deitada no computador e em pé no celular.
 * A foto do topo continua por baixo: o vídeo só aparece quando começa a tocar (sem tela preta enquanto baixa).
 * Quem pediu menos movimento ou economia de dados fica só com a foto. Botão de pausar (WCAG 2.2.2: movimento > 5 s).
 */
export function VideoTopo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [tocando, setTocando] = useState(false);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    const calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const economia = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (calmo || economia) return;
    const largo = window.matchMedia('(min-width: 900px)');
    const escolhe = () => setSrc(largo.matches ? '/video/hero-computador.mp4' : '/video/hero-celular.mp4');
    escolhe();
    largo.addEventListener('change', escolhe);
    return () => largo.removeEventListener('change', escolhe);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    v.muted = true;
    v.play().catch(() => {}); // alguns navegadores só tocam depois do primeiro toque; a foto segura até lá
  }, [src]);

  const alterna = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play().catch(() => {}); setPausado(false); } else { v.pause(); setPausado(true); }
  };

  if (!src) return null;
  return (
    <>
      <video
        ref={ref}
        key={src}
        className={`topo__video${tocando ? ' tocando' : ''}`}
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-hidden="true"
        onPlaying={() => setTocando(true)}
      />
      {tocando && (
        <button type="button" className="topo__pausa" onClick={alterna} aria-label={pausado ? 'Tocar o vídeo de fundo' : 'Pausar o vídeo de fundo'}>
          {pausado ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" /></svg>
          )}
        </button>
      )}
    </>
  );
}
