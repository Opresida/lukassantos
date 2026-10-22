import { LETRAS, LOGO_VIEWBOX } from './marca/logo';

/** Logo vetorial do Lukas Santos, desenhada com os contornos tirados do mídia kit (ver scripts/preparar-midia.py).
 *  Cores por CSS: `.logo__lukas`, `.logo__santos` e `.logo__a`. Cada letra recebe `--i` (ordem) para animações. */
export function Logo({ className = '', titulo = 'Lukas Santos', decorativa }: { className?: string; titulo?: string; decorativa?: boolean }) {
  return (
    <svg className={`logo ${className}`} viewBox={LOGO_VIEWBOX} role={decorativa ? undefined : 'img'} aria-hidden={decorativa || undefined} aria-label={decorativa ? undefined : titulo}>
      {!decorativa && <title>{titulo}</title>}
      {LETRAS.map((l, i) => (
        <path key={i} d={l.d} className={`logo__${l.papel.toLowerCase()}`} pathLength={1} style={{ '--i': i } as React.CSSProperties} />
      ))}
    </svg>
  );
}
