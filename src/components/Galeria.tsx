'use client';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Foto } from '@/data/conteudo';

/** Mural de fotos em colunas; clique abre a foto grande num <dialog> com anterior/próxima (setas do teclado e Esc). */
export function Galeria({ fotos }: { fotos: Foto[] }) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [atual, setAtual] = useState<number | null>(null);

  const abre = (i: number) => { setAtual(i); dialogo.current?.showModal(); };
  const fecha = () => dialogo.current?.close();
  const anda = useCallback((passo: number) => setAtual((a) => (a === null ? a : (a + passo + fotos.length) % fotos.length)), [fotos.length]);

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') anda(1);
      if (e.key === 'ArrowLeft') anda(-1);
    };
    const fechou = () => setAtual(null);
    d.addEventListener('keydown', tecla);
    d.addEventListener('close', fechou);
    return () => { d.removeEventListener('keydown', tecla); d.removeEventListener('close', fechou); };
  }, [anda]);

  const f = atual === null ? null : fotos[atual];

  return (
    <>
      <ul className="galeria">
        {fotos.map((foto, i) => (
          <li key={foto.arquivo} className="galeria__item">
            <button type="button" onClick={() => abre(i)} aria-label={`Ampliar: ${foto.alt}`}>
              <Image src={`/fotos/${foto.arquivo}.webp`} alt={foto.alt} width={foto.largura} height={foto.altura} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" />
            </button>
          </li>
        ))}
      </ul>
      <dialog ref={dialogo} className="visor" aria-label="Foto ampliada" onClick={(e) => { if (e.target === e.currentTarget) fecha(); }}>
        {f && (
          <figure className="visor__foto">
            <Image src={`/fotos/${f.arquivo}.webp`} alt={f.alt} width={f.largura} height={f.altura} sizes="100vw" />
            <figcaption>{f.alt} <span>{(atual ?? 0) + 1} / {fotos.length}</span></figcaption>
          </figure>
        )}
        <button type="button" className="visor__fechar" onClick={fecha} aria-label="Fechar">×</button>
        <button type="button" className="visor__seta visor__seta--ant" onClick={() => anda(-1)} aria-label="Foto anterior">‹</button>
        <button type="button" className="visor__seta visor__seta--prox" onClick={() => anda(1)} aria-label="Próxima foto">›</button>
      </dialog>
    </>
  );
}
