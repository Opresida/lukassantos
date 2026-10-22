@AGENTS.md

# Como trabalhar neste projeto
- Ler README, CONTEXT, ARCHITECTURE, TODO e este arquivo ao começar; atualizar os cinco antes de encerrar.
- Porta **3600**. Nunca rodar `pnpm build` com o `pnpm dev` no ar.
- Nada inventado: número, cidade, data, evento e link só do mídia kit, da biografia ou conferidos na plataforma (ver CONTEXT.md).
- **Preço de show NUNCA no site** (decisão do Humberto, 22/10/2026). Formatos aparecem sem valor.
- Visual: só a identidade do mídia kit do Lukas (tokens no topo de `src/app/globals.css`). Nada do visual da BrandSquad, Royals, O.C.U.L.T.O ou Baile das Bruxas.
- Logo e fotos saem de `pnpm midia` (`scripts/preparar-midia.py`); `src/components/marca/logo.ts` é gerado, não editar à mão.
- Conferência visual: Playwright em 360, 390, 430, 768, 1024, 1280 e 1440 px. O navegador do Playwright guarda zoom de 80% para `127.0.0.1` (e 75% para `localhost`): usar **http://127.0.0.2:3600** num contexto novo (`browser.newContext`) para medir e clicar sem zoom.
- Publicação só com o ok do Humberto.
