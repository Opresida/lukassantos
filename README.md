# Lukas Santos · site oficial

Site one-page do cantor Lukas Santos (sertanejo universitário e forronejo, Manaus). Cliente da BrandSquad. Objetivo: pedido de show pelo WhatsApp. Next.js 16 + React 19, sem banco.

## Rodar
```bash
pnpm install
pnpm dev            # http://localhost:3600
pnpm typecheck && pnpm lint
pnpm build          # derrube o dev antes (o build derruba o next dev)
pnpm start          # build de produção na 3600
```

## Mídia (logo, fotos, ícones, OG)
```bash
pnpm midia          # = python scripts/preparar-midia.py  (pip: pymupdf fonttools pillow)
```
Lê o material do cliente em `D:\CLIENTES BRANDSQUADS\Lukas Santos` e gera:
- `public/marca/*.svg` — logo vetorial tirada da fonte embutida no mídia kit + `src/components/marca/logo.ts` (caminhos por letra, para as animações)
- `public/fotos/*.webp` — fotos do WhatsApp e imagens de dentro do PDF; capas do YouTube; capa do lançamento (Deezer)
- `public/imprensa/*.jpg` — fotos de estúdio originais para download
- `src/app/icon.svg`, `apple-icon.png`, `opengraph-image.jpg`

## Seções
Topo → Ao vivo (4 covers) → números → Formatos → Onde já tocou → A estrada (linha do tempo + lançamento) → Banda → Fotos (galeria, imprensa, rider) → Contratar (formulário → WhatsApp) → Rodapé.

## Estado
No ar desde 22/10/2026. Domínio oficial: **https://www.lukassantos.com** (`lukassantos.com` redireciona para o www; `lukassantos.vercel.app` continua respondendo). Código em GitHub `Opresida/lukassantos` (branch `main`); projeto Vercel `opresidas-projects/lukassantos`, conectado ao GitHub: todo push na `main` publica sozinho. Endereço oficial em `src/lib/site.ts` (`SITE_URL`; a variável `NEXT_PUBLIC_SITE_URL` sobrescreve, se um dia precisar).
