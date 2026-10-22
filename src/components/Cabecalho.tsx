'use client';
import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';

const LINKS = [
  { href: '#ao-vivo', rotulo: 'Ao vivo' },
  { href: '#formatos', rotulo: 'Formatos' },
  { href: '#estrada', rotulo: 'A estrada' },
  { href: '#banda', rotulo: 'Banda' },
  { href: '#fotos', rotulo: 'Fotos' },
];

/** Cabeçalho fixo: transparente sobre o topo, ganha fundo ao rolar. No celular, o menu abre em tela cheia. */
export function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const botaoRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 40);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-aberto', aberto);
    if (!aberto) return;
    const tecla = (e: KeyboardEvent) => { if (e.key === 'Escape') { setAberto(false); botaoRef.current?.focus(); } };
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, [aberto]);

  return (
    <header className={`cabecalho${rolou ? ' cabecalho--rolou' : ''}${aberto ? ' cabecalho--aberto' : ''}`}>
      <a href="#topo" className="cabecalho__marca" aria-label="Lukas Santos, voltar ao topo" onClick={() => setAberto(false)}>
        <Logo decorativa />
      </a>
      <nav id="menu" className="cabecalho__nav" aria-label="Seções">
        <ul>
          {LINKS.map((l) => (
            <li key={l.href}><a href={l.href} onClick={() => setAberto(false)}>{l.rotulo}</a></li>
          ))}
        </ul>
      </nav>
      <a href="#contratar" className="botao botao--laranja botao--pequeno cabecalho__cta" onClick={() => setAberto(false)}>Contratar show</a>
      <button ref={botaoRef} type="button" className="cabecalho__menu" aria-expanded={aberto} aria-controls="menu" onClick={() => setAberto((a) => !a)}>
        <span className="so-leitor">{aberto ? 'Fechar menu' : 'Abrir menu'}</span>
        <span className="cabecalho__hamburguer" aria-hidden="true"><span /><span /></span>
      </button>
    </header>
  );
}
