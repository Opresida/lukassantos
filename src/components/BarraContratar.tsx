'use client';
import { useEffect, useState } from 'react';
import { linkWhatsApp, MENSAGEM_PADRAO } from '@/lib/site';
import { IconeWhatsApp } from './Icones';

/** Barra fixa no rodapé da tela (só celular e tablet): aparece depois do topo e some quando o formulário de
 *  contratar ou o rodapé estão na tela, para não cobrir o que a pessoa está preenchendo. */
export function BarraContratar() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const topo = document.getElementById('topo');
    const alvos = ['contratar', 'rodape'].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const estado = { passouTopo: false, alvoNaTela: new Set<Element>() };
    const atualiza = () => setVisivel(estado.passouTopo && estado.alvoNaTela.size === 0);
    const ioTopo = new IntersectionObserver(([e]) => { estado.passouTopo = !e.isIntersecting; atualiza(); });
    const ioAlvos = new IntersectionObserver((itens) => {
      for (const it of itens) {
        if (it.isIntersecting) estado.alvoNaTela.add(it.target);
        else estado.alvoNaTela.delete(it.target);
      }
      atualiza();
    });
    if (topo) ioTopo.observe(topo);
    alvos.forEach((a) => ioAlvos.observe(a));
    return () => { ioTopo.disconnect(); ioAlvos.disconnect(); };
  }, []);

  return (
    <div className={`barra-contratar${visivel ? ' barra-contratar--visivel' : ''}`} aria-hidden={!visivel} inert={!visivel}>
      <a href="#contratar" className="botao botao--laranja barra-contratar__principal">Contratar show</a>
      <a href={linkWhatsApp(MENSAGEM_PADRAO)} className="barra-contratar__whats" target="_blank" rel="noopener noreferrer" aria-label="Chamar no WhatsApp">
        <IconeWhatsApp />
      </a>
    </div>
  );
}
