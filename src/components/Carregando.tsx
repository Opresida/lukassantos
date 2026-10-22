import { A_VIEWBOX, LETRAS } from './marca/logo';

const A = LETRAS.find((l) => l.papel === 'A')!;

/** Spinner da marca: o "A" laranja do Lukas pulsando no centro de um arco que gira (um disco tocando).
 *  `tamanho` em px. Com movimento reduzido, o arco para e o "A" fica aceso. */
export function Carregando({ tamanho = 56, texto = 'Carregando' }: { tamanho?: number; texto?: string }) {
  return (
    <span className="carregando" role="status" style={{ '--tam': `${tamanho}px` } as React.CSSProperties}>
      <svg className="carregando__disco" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="46" className="carregando__trilho" />
        <circle cx="50" cy="50" r="46" className="carregando__arco" pathLength={100} />
      </svg>
      <svg className="carregando__a" viewBox={A_VIEWBOX} aria-hidden="true">
        <path d={A.d} />
      </svg>
      <span className="so-leitor">{texto}</span>
    </span>
  );
}
