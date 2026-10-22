'use client';
import { useEffect, useRef } from 'react';
import { Logo } from './Logo';

export const FIM_DA_ABERTURA = 'ls:fim-abertura';
const MINIMO_MS = 2600; // tempo da animação completa (contorno → preenchimento → batida do "A")
const MAXIMO_MS = 5000; // nunca segura a pessoa mais que isso, mesmo com a rede lenta

/** Abertura com a logo: as letras se desenham em contorno, enchem de branco, o "A" laranja bate como bumbo e a cortina
 *  sobe. Uma vez por sessão, com "Pular" (e Esc). Quem pediu menos movimento não vê (script antes da pintura no layout). */
export function Abertura() {
  const pularRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // avisa a trava de segurança do layout (PRE_PINTURA) que o React subiu e assume daqui
    (window as Window & { __lsVivo?: boolean }).__lsVivo = true;
    const html = document.documentElement;
    if (!html.classList.contains('abertura-ativa')) return;
    let acabou = false;
    const timers: number[] = [];
    const fim = () => {
      if (acabou) return;
      acabou = true;
      try { sessionStorage.setItem('ls-abertura', '1'); } catch {}
      html.classList.add('abertura-saindo');
      timers.push(window.setTimeout(() => {
        html.classList.remove('abertura-ativa', 'abertura-saindo');
        html.classList.add('sem-abertura');
        window.dispatchEvent(new Event(FIM_DA_ABERTURA));
      }, 700));
    };
    const inicio = performance.now();
    const quandoCarregar = () => timers.push(window.setTimeout(fim, Math.max(0, MINIMO_MS - (performance.now() - inicio))));
    if (document.readyState === 'complete') quandoCarregar();
    else window.addEventListener('load', quandoCarregar, { once: true });
    timers.push(window.setTimeout(fim, MAXIMO_MS));
    const tecla = (e: KeyboardEvent) => { if (e.key === 'Escape') fim(); };
    window.addEventListener('keydown', tecla);
    const botao = pularRef.current;
    botao?.addEventListener('click', fim);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('load', quandoCarregar);
      window.removeEventListener('keydown', tecla);
      botao?.removeEventListener('click', fim);
    };
  }, []);

  return (
    <div className="abertura" role="status" aria-live="polite">
      <div className="abertura__faixas" aria-hidden="true" />
      <div className="abertura__miolo">
        <Logo className="abertura__logo" decorativa />
        <span className="abertura__barra" aria-hidden="true"><span /></span>
        <span className="abertura__legenda" aria-hidden="true">Sertanejo universitário · Forronejo</span>
        <span className="so-leitor">Carregando o site do Lukas Santos</span>
      </div>
      <button ref={pularRef} type="button" className="abertura__pular">Pular</button>
    </div>
  );
}
