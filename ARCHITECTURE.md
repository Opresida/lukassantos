# Arquitetura

- **Next.js 16 (App Router) + React 19**, página estática única (`src/app/page.tsx`). CSS puro em `src/app/globals.css` (tokens no `:root`, mobile-first). Fontes por `next/font` (Barlow Condensed + Barlow) — não redefinir `--fonte-titulo`/`--fonte-texto` no CSS, senão perde a fonte reserva de mesma largura.
- **Dados:** `src/data/conteudo.ts` (vídeos, números, linha do tempo, lugares, formatos, banda, rider, galeria, imprensa) e `src/lib/site.ts` (contatos, links, `linkWhatsApp`).
- **Logo:** `src/components/Logo.tsx` desenha o SVG a partir de `marca/logo.ts` (gerado). Cada letra tem `pathLength=1` e `--i` para as animações de contorno → preenchimento.

## Componentes
| Arquivo | O quê |
|---|---|
| `Abertura.tsx` | Loader 1x por sessão: letras se desenham, enchem, o "A" bate; barra de progresso; "Pular" e Esc. Mín. 2,6 s, máx. 5 s. |
| `Carregando.tsx` | Spinner da marca ("A" pulsando dentro de um arco que gira). Usado enquanto o vídeo carrega. |
| `Cabecalho.tsx` | Fixo; menu em tela cheia no celular (< 1024 px). |
| `BarraContratar.tsx` | Barra fixa no celular/tablet: aparece depois do topo, some no formulário e no rodapé. |
| `Videos.tsx` | Player + fila; o YouTube (nocookie) só carrega ao apertar play. |
| `FormContratar.tsx` | Formulário → mensagem pronta no `wa.me`. `BotaoFormato` (cartões) marca o formato no formulário por evento `ls:escolhe-formato`. |
| `Galeria.tsx` | Mural em colunas + `<dialog>` com setas e Esc. |
| `Revela.tsx` | Aparece ao rolar (IntersectionObserver). |

## Script antes da pintura (`layout.tsx`)
Põe `js` no `<html>`, decide `abertura-ativa` × `sem-abertura` (sessão ou movimento reduzido) e tem **trava de segurança**: se o React não subir em 6,5 s (`window.__lsVivo`), tira a cortina e mostra todo `.revela`.

## Imagens
Fotos pré-redimensionadas em webp (≤ 1600 px) e servidas por `next/image` (só webp: AVIF era lento demais na primeira otimização). Topo com art direction (`getImageProps` + `<picture>`): vertical no celular, horizontal do mídia kit no computador.
