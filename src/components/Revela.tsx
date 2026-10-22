'use client';
import { useEffect, useRef } from 'react';
import { FIM_DA_ABERTURA } from './Abertura';

/** Marca o bloco como "visivel" quando ele entra na tela (CSS `.revela` em globals.css). Sem JS, tudo aparece.
 *  `aguardaAbertura`: com a abertura na tela, só começa depois que a cortina sobe. */
export function Revela({ children, className = '', como: Tag = 'div', id, aguardaAbertura }: { children: React.ReactNode; className?: string; como?: 'div' | 'section' | 'header' | 'ul' | 'ol' | 'li'; id?: string; aguardaAbertura?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((itens) => {
      for (const it of itens) if (it.isIntersecting) { el.classList.add('visivel'); io.disconnect(); }
    }, { rootMargin: '0px 0px -10% 0px' });
    const comeca = () => io.observe(el);
    if (aguardaAbertura && document.documentElement.classList.contains('abertura-ativa')) window.addEventListener(FIM_DA_ABERTURA, comeca, { once: true });
    else comeca();
    return () => { io.disconnect(); window.removeEventListener(FIM_DA_ABERTURA, comeca); };
  }, [aguardaAbertura]);
  return <Tag ref={ref as never} id={id} className={`revela ${className}`}>{children}</Tag>;
}
