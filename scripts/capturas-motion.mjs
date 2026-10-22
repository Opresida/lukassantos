// Lukas Santos · fotos do site NO AR para o Reel 3D de apresentação (22/10/2026).
// Uso: node scripts/capturas-motion.mjs
// Tira telas do celular (390 px × 3 = 1170×2532) e do computador (1440 px × 2) em cada estado que o vídeo mostra:
// abertura, topo, ao vivo, formatos, onde tocou e o formulário sendo preenchido campo a campo (estados reais da página).
// Também gera a tela da conversa com a mensagem que o site monta (balão genérico, sem marca de app de mensagem).
// Saída: D:\dev\remotion-studio\public\lukas\site\*.png + medidas.json (retângulos em px da foto)
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('D:/dev/omniroute/node_modules/playwright');

const SITE = process.env.SITE ?? 'https://lukassantos.vercel.app';
const SAIDA = 'D:/dev/remotion-studio/public/lukas/site';
fs.mkdirSync(SAIDA, { recursive: true });
const navegador = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const CELULAR = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' };
const COMPUTADOR = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 };
const medidas = {};
const foto = async (p, nome) => { await p.screenshot({ path: path.join(SAIDA, `${nome}.png`) }); console.log('ok', nome); };
const retangulo = (p, sel) => p.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left * 3, y: r.top * 3, w: r.width * 3, h: r.height * 3 }; }, sel);

// prepara a página: sem abertura, tudo revelado, imagens preguiçosas carregadas
async function pagina(aparelho, { abertura = false } = {}) {
  const ctx = await navegador.newContext(aparelho);
  if (!abertura) await ctx.addInitScript(() => { try { sessionStorage.setItem('ls-abertura', '1'); } catch {} });
  await ctx.addInitScript(() => { window.open = () => null; });
  const p = await ctx.newPage();
  await p.goto(SITE, { waitUntil: 'networkidle', timeout: 120000 });
  return { ctx, p };
}
async function revelaTudo(p) {
  const alt = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < alt; y += 600) { await p.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(120); }
  await p.evaluate(() => {
    document.querySelectorAll('.revela').forEach((e) => e.classList.add('visivel'));
    document.querySelectorAll('img[loading=lazy]').forEach((i) => { i.loading = 'eager'; });
  });
  // a fila horizontal de vídeos fica fora da tela e algumas capas preguiçosas não terminam: não travar por elas
  await p.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 20000 }).catch(() => console.log('aviso: alguma imagem não terminou de carregar'));
  await p.waitForTimeout(900);
}
// rola até a seção, com o topo dela logo abaixo do cabeçalho
async function vaiPara(p, sel, folga = 70) {
  await p.evaluate(([s, f]) => { const el = document.querySelector(s); window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - f, behavior: 'instant' }); }, [sel, folga]);
  await p.waitForTimeout(700);
}

// 1) abertura (a logo desenhada, antes da cortina subir)
{
  // a abertura dura de 2,6 a 5 s a partir do carregamento: fotografar com a logo já cheia e a cortina ainda fechada
  const ctx = await navegador.newContext(CELULAR);
  const p = await ctx.newPage();
  await p.goto(SITE, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await p.waitForTimeout(1900);
  await foto(p, 'cel-abertura');
  // a mesma tela sem a logo: no vídeo, a logo 3D é que pousa nesse lugar
  await p.addStyleTag({ content: '.abertura__logo{visibility:hidden!important}' });
  await foto(p, 'cel-abertura-vazia');
  await ctx.close();
}

// 2) topo, ao vivo, formatos, lugares e o formulário
{
  const { ctx, p } = await pagina(CELULAR);
  await p.waitForTimeout(2200); // a logo do topo termina de se desenhar
  await foto(p, 'cel-topo');
  await revelaTudo(p);
  await vaiPara(p, '#ao-vivo', 64);
  await foto(p, 'cel-ao-vivo');
  medidas.player = await retangulo(p, '.videos__player');
  // o 2º vídeo da fila ("Na Maldade / Olho Encharcado") é o que toca no Reel: o dedo toca nele
  medidas.fila2 = await p.evaluate(() => { const r = document.querySelectorAll('.videos__item')[1].getBoundingClientRect(); return { x: r.left * 3, y: r.top * 3, w: r.width * 3, h: r.height * 3 }; });
  await vaiPara(p, '.formatos', 80);
  await foto(p, 'cel-formatos');
  // cada cartão de formato sozinho (viram placas 3D)
  const cartoes = p.locator('.formato');
  const n = await cartoes.count();
  medidas.formatos = [];
  // barra fixa e cabeçalho ficam por cima do cartão na foto: esconder só durante estas fotos
  const oculta = await p.addStyleTag({ content: '.barra-contratar,.cabecalho{visibility:hidden!important}' });
  for (let i = 0; i < n; i++) {
    await cartoes.nth(i).screenshot({ path: path.join(SAIDA, `formato-${i + 1}.png`) });
    const b = await cartoes.nth(i).boundingBox();
    medidas.formatos.push({ w: b.width * 3, h: b.height * 3 });
  }
  await oculta.evaluate((el) => el.remove());
  await vaiPara(p, '#lugares', 64);
  await foto(p, 'cel-lugares');
  // formulário: vazio e depois campo a campo, como uma pessoa preencheria
  await vaiPara(p, '.contratar__form', 76);
  await p.evaluate(() => { const b = document.querySelector('.barra-contratar'); if (b) b.style.display = 'none'; });
  await foto(p, 'cel-form-0');
  medidas.campos = {};
  for (const s of ['input[name=nome]', 'select[name=evento]', 'input[name=cidade]', 'input[type=date]', 'select[name=formato]', '.form__enviar']) medidas.campos[s] = await retangulo(p, s);
  await p.fill('input[name=nome]', 'Maria Oliveira');
  await p.evaluate(() => document.activeElement.blur());
  await foto(p, 'cel-form-1');
  await p.selectOption('select[name=evento]', 'Casamentos');
  await foto(p, 'cel-form-2');
  await p.fill('input[name=cidade]', 'Parintins');
  await p.evaluate(() => document.activeElement.blur());
  await foto(p, 'cel-form-3');
  await p.fill('input[type=date]', '2026-12-12');
  await p.evaluate(() => document.activeElement.blur());
  await foto(p, 'cel-form-4');
  await p.selectOption('select[name=formato]', 'Banda acústico');
  await foto(p, 'cel-form-5');
  // rola até o botão de enviar aparecer inteiro
  await p.evaluate(() => window.scrollBy({ top: 300, behavior: 'instant' }));
  await p.waitForTimeout(500);
  await foto(p, 'cel-form-6');
  medidas.enviar = await retangulo(p, '.form__enviar');
  // a mensagem exatamente como o site monta (o window.open foi trocado por um gravador)
  await p.evaluate(() => { window.__msg = ''; window.open = (u) => { window.__msg = decodeURIComponent(String(u).split('text=')[1] || ''); return null; }; });
  await p.click('.form__enviar');
  medidas.mensagem = await p.evaluate(() => window.__msg);
  await ctx.close();
}

// 3) computador: topo (vai para o notebook 3D)
{
  const { ctx, p } = await pagina(COMPUTADOR);
  await p.waitForTimeout(2200);
  await p.screenshot({ path: path.join(SAIDA, 'pc-topo.png') });
  console.log('ok pc-topo');
  await ctx.close();
}

// 3b) tablet (820 px × 2, retrato): topo, para a capa do Reel
{
  const { ctx, p } = await pagina({ viewport: { width: 820, height: 1180 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await p.waitForTimeout(2200);
  await p.screenshot({ path: path.join(SAIDA, 'tab-topo.png') });
  console.log('ok tab-topo');
  await ctx.close();
}

// 4) tela da conversa com a mensagem pronta (genérica: bolha verde, sem logo nem interface de app real)
{
  const ctx = await navegador.newContext(CELULAR);
  const p = await ctx.newPage();
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const linhas = esc(medidas.mensagem).split('\n').map((l) => l.replace(/^(Nome|Evento|Cidade|Data|Formato):/, '<b>$1:</b>')).join('<br>');
  await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:ital,wght@1,800;1,900&display=block" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
body{width:390px;height:844px;background:#0e0d0f;font-family:Barlow,sans-serif;color:#f4efe8;display:flex;flex-direction:column}
.topo{height:112px;padding:52px 16px 0;display:flex;gap:12px;align-items:center;background:#18161a;border-bottom:1px solid #2a272c}
.av{width:40px;height:40px;border-radius:50%;background:#0b0b0c;display:grid;place-items:center;border:1px solid #333}
.av span{font-family:'Barlow Condensed';font-style:italic;font-weight:900;color:#f26921;font-size:24px}
.nome{font-weight:700;font-size:16px}.sub{font-size:12px;color:#9a938d}
.fundo{flex:1;padding:22px 12px;background:radial-gradient(circle at 80% 10%,#2a0b10,transparent 60%),#0e0d0f}
.dia{margin:0 auto 18px;width:max-content;font-size:11px;color:#9a938d;background:#1d1b1f;padding:4px 10px;border-radius:8px}
.bolha{margin-left:auto;max-width:300px;background:#1f6b3d;padding:12px 14px 22px;border-radius:14px 14px 4px 14px;font-size:15px;line-height:1.42;position:relative;box-shadow:0 6px 18px #0006}
.bolha b{font-weight:700}
.hora{position:absolute;right:10px;bottom:5px;font-size:11px;color:#cfe8d9}
.barra{height:86px;padding:12px;display:flex;gap:10px;background:#18161a}
.campo{flex:1;height:44px;border-radius:22px;background:#26232a}
.env{width:44px;height:44px;border-radius:50%;background:#1f6b3d}
</style></head><body>
<div class="topo"><div class="av"><img src="data:image/svg+xml;base64,${fs.readFileSync(path.resolve('public/marca/lukas-A.svg')).toString('base64')}" style="height:22px"></div><div><div class="nome">Produção · Lukas Santos</div><div class="sub">(92) 99353-9110</div></div></div>
<div class="fundo"><div class="dia">Hoje</div><div class="bolha">${linhas}<span class="hora">21:04 ✓✓</span></div></div>
<div class="barra"><div class="campo"></div><div class="env"></div></div>
</body></html>`, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await foto(p, 'cel-conversa');
  medidas.bolha = await retangulo(p, '.bolha');
  await ctx.close();
}

fs.writeFileSync(path.join(SAIDA, 'medidas.json'), JSON.stringify(medidas, null, 1));
await navegador.close();
console.log(JSON.stringify(medidas, null, 1));
