"""Prepara toda a mídia do site a partir do material do cliente (pasta do Lukas no D:).

Uso: python scripts/preparar-midia.py   (pip: pymupdf, fonttools, pillow)

- Logo: tira o contorno exato de cada letra da fonte embutida no mídia kit (o PDF tem "LUKAS santos" como texto vivo
  em Gobold Extra1 Italic) e grava os SVGs em public/marca + os caminhos em src/components/marca/logo.ts.
- Fotos: converte as fotos do WhatsApp e as imagens de dentro do PDF (CMYK) para webp em public/fotos.
- Capas dos vídeos do YouTube e capa do lançamento (Deezer) baixadas para public/fotos.
- Ícones e imagem de compartilhamento (OG) em src/app.
"""
import io, json, os, re, urllib.request
import pymupdf
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from PIL import Image, ImageOps

CLIENTE = r'D:\CLIENTES BRANDSQUADS\Lukas Santos'
PDF = os.path.join(CLIENTE, 'Midia Kit', 'MIDIA KIT LUKAS SANTOS 2026.pdf')
FOTOS = os.path.join(CLIENTE, 'Fotos')
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(RAIZ, 'public')
LARANJA, BRANCO, PRETO = '#F26921', '#FFFFFF', '#0B0B0C'

doc = pymupdf.open(PDF)


# ---------- logo ----------
def logo():
    p = doc[0]
    xref = [f[0] for f in p.get_fonts(full=True) if 'Gobold' in f[3]][0]
    font = TTFont(io.BytesIO(doc.extract_font(xref)[3]))
    gs, ordem, upm = font.getGlyphSet(), font.getGlyphOrder(), font['head'].unitsPerEm

    letras = []  # (papel, glifo, escala, x, y)
    for tr in p.get_texttrace():
        if 'Gobold' not in tr['font']:
            continue
        s = tr['size'] / upm
        laranja = tr['color'][0] > 0.9 and tr['color'][2] < 0.3
        for uni, gid, (ox, oy), *_ in tr['chars']:
            if chr(uni) == ' ':
                continue
            papel = 'A' if laranja else ('lukas' if tr['size'] > 100 else 'santos')
            letras.append((papel, chr(uni).upper(), ordem[gid], s, ox, oy))

    def caixa(itens):
        bb = None
        for _, _, n, s, ox, oy in itens:
            bp = BoundsPen(gs)
            gs[n].draw(TransformPen(bp, (s, 0, 0, -s, ox, oy)))
            b = bp.bounds
            bb = b if bb is None else (min(bb[0], b[0]), min(bb[1], b[1]), max(bb[2], b[2]), max(bb[3], b[3]))
        return bb

    def arred(t):
        return re.sub(r'-?\d+\.\d+', lambda m: f'{float(m.group()):.2f}'.rstrip('0').rstrip('.'), t)

    def caminho(item, dx, dy):
        _, _, n, s, ox, oy = item
        pen = SVGPathPen(gs)
        gs[n].draw(TransformPen(pen, (s, 0, 0, -s, ox - dx, oy - dy)))
        return arred(pen.getCommands())

    def svg(itens, cores):
        x0, y0, x1, y1 = caixa(itens)
        w, h = round(x1 - x0, 2), round(y1 - y0, 2)
        grupos = {}
        for it in itens:
            grupos[it[0]] = grupos.get(it[0], '') + caminho(it, x0, y0)
        corpo = ''.join(f'<path fill="{cores[k]}" d="{grupos[k]}"/>' for k in ('lukas', 'santos', 'A') if k in grupos)
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="Lukas Santos">'
                f'<title>Lukas Santos</title>{corpo}</svg>\n')

    variacoes = {
        'lukas-santos.svg': (letras, dict(lukas=BRANCO, santos=BRANCO, A=LARANJA)),
        'lukas-santos-laranja.svg': (letras, dict(lukas=BRANCO, santos=LARANJA, A=LARANJA)),
        'lukas-santos-preto.svg': (letras, dict(lukas=PRETO, santos=PRETO, A=LARANJA)),
        'lukas-santos-branco.svg': (letras, dict(lukas=BRANCO, santos=BRANCO, A=BRANCO)),
        'lukas-santos-mono-preto.svg': (letras, dict(lukas=PRETO, santos=PRETO, A=PRETO)),
        'lukas-A.svg': ([l for l in letras if l[0] == 'A'], dict(A=LARANJA)),
    }
    os.makedirs(os.path.join(PUB, 'marca'), exist_ok=True)
    for nome, (itens, cores) in variacoes.items():
        with open(os.path.join(PUB, 'marca', nome), 'w', encoding='utf-8') as f:
            f.write(svg(itens, cores))

    # caminhos por letra para o loader e o topo (animação letra a letra)
    x0, y0, x1, y1 = caixa(letras)
    dados = [dict(papel=l[0], letra=l[1], d=caminho(l, x0, y0)) for l in letras]
    bx0, by0, bx1, by1 = caixa([l for l in letras if l[0] == 'A'])
    ts = ('// Gerado por scripts/preparar-midia.py a partir do mídia kit (fonte embutida no PDF). Não editar à mão.\n'
          f"export const LOGO_VIEWBOX = '0 0 {round(x1 - x0, 2)} {round(y1 - y0, 2)}';\n"
          f"/** Caixa do \"A\" laranja dentro do viewBox da logo (para usar o \"A\" sozinho). */\n"
          f"export const A_VIEWBOX = '{round(bx0 - x0, 2)} {round(by0 - y0, 2)} {round(bx1 - bx0, 2)} {round(by1 - by0, 2)}';\n"
          "export type Letra = { papel: 'lukas' | 'A' | 'santos'; letra: string; d: string };\n"
          f'export const LETRAS: Letra[] = {json.dumps(dados, ensure_ascii=False, indent=1)};\n')
    os.makedirs(os.path.join(RAIZ, 'src', 'components', 'marca'), exist_ok=True)
    with open(os.path.join(RAIZ, 'src', 'components', 'marca', 'logo.ts'), 'w', encoding='utf-8') as f:
        f.write(ts)

    # o "A" (marca curta) em quadrado preto: favicon e ícones
    a = [l for l in letras if l[0] == 'A']
    ax0, ay0, ax1, ay1 = caixa(a)
    aw, ah = ax1 - ax0, ay1 - ay0
    lado = ah * 1.36
    dx, dy = ax0 - (lado - aw) / 2, ay0 - (lado - ah) / 2
    icone = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {lado:.2f} {lado:.2f}">'
             f'<rect width="{lado:.2f}" height="{lado:.2f}" rx="{lado * .18:.2f}" fill="{PRETO}"/>'
             f'<path fill="{LARANJA}" d="{caminho(a[0], dx, dy)}"/></svg>\n')
    with open(os.path.join(RAIZ, 'src', 'app', 'icon.svg'), 'w', encoding='utf-8') as f:
        f.write(icone)
    rasteriza(icone, 180, os.path.join(RAIZ, 'src', 'app', 'apple-icon.png'))
    rasteriza(icone, 512, os.path.join(PUB, 'marca', 'icone-512.png'))


def rasteriza(svg_txt, largura, destino, alfa=False):
    s = pymupdf.open(stream=svg_txt.encode(), filetype='svg')
    r = s[0].rect
    pix = s[0].get_pixmap(matrix=pymupdf.Matrix(largura / r.width, largura / r.width), alpha=alfa)
    pix.save(destino)


# ---------- fotos ----------
def webp(img, destino, larg_max, q=80):
    img = ImageOps.exif_transpose(img).convert('RGB')
    if img.width > larg_max:
        img = img.resize((larg_max, round(img.height * larg_max / img.width)), Image.LANCZOS)
    img.save(os.path.join(PUB, 'fotos', destino), 'WEBP', quality=q, method=6)


def do_pdf(xref):
    pix = pymupdf.Pixmap(doc, xref)
    if pix.n - pix.alpha >= 4:
        pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
    return Image.open(io.BytesIO(pix.tobytes('png')))


# fotos do WhatsApp, na ordem do nome do arquivo (1 a 24)
WHATS = sorted(f for f in os.listdir(FOTOS) if f.lower().endswith(('.jpg', '.jpeg')))

PALCO = {  # nº da foto -> nome no site
    11: 'palco-violao-banda', 12: 'palco-chapeu-canta', 14: 'palco-chapeu-anda', 16: 'palco-sorri',
    17: 'palco-chapeu-sorri', 19: 'palco-gargalhada', 21: 'palco-olhar', 23: 'palco-violao',
    3: 'palco-pb-violao', 2: 'palco-sentado', 6: 'palco-risada', 24: 'palco-casa', 18: 'palco-close', 1: 'palco-bar',
}
ESTUDIO = {4: 'estudio-oculos', 5: 'estudio-chapeu-queixo', 7: 'estudio-chapeu', 13: 'estudio-camiseta',
           9: 'estudio-costas', 10: 'estudio-chapeu-frente', 8: 'estudio-bolsos'}
BANDA = {89: 'banda-jorge-sousa', 99: 'banda-salmo-barbosa', 100: 'banda-mailson-mendes',
         101: 'banda-raimundo-nonato', 102: 'banda-alexsandro-silva', 103: 'banda-felipe-sena'}
MULTIDAO = {64: 'multidao-1', 65: 'multidao-2', 66: 'multidao-3', 67: 'multidao-drone', 68: 'multidao-4'}
VIDEOS = ['H_wYliEwh_4', 'W9hHyNxQfK4', '1cz9R6D7s2E', 'nQpfv5TKhYo']
CAPA_LANCAMENTO = 'https://cdn-images.dzcdn.net/images/cover/c40ad01f52d690630a3bd8aadb137b13/1000x1000-000000-80-0-0.jpg'


def baixa(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    return Image.open(io.BytesIO(urllib.request.urlopen(req, timeout=30).read()))


def fotos():
    os.makedirs(os.path.join(PUB, 'fotos'), exist_ok=True)
    os.makedirs(os.path.join(PUB, 'imprensa'), exist_ok=True)
    for n, nome in {**PALCO, **ESTUDIO}.items():
        webp(Image.open(os.path.join(FOTOS, WHATS[n - 1])), nome + '.webp', 1600)
    # fotos de estúdio em alta para imprensa e contratantes (originais, sem recompressão)
    for n, nome in ESTUDIO.items():
        with open(os.path.join(FOTOS, WHATS[n - 1]), 'rb') as a, open(os.path.join(PUB, 'imprensa', f'lukas-santos-{nome}.jpg'), 'wb') as b:
            b.write(a.read())
    # topo: composições do próprio mídia kit (já com as faixas vermelhas)
    webp(do_pdf(121), 'topo-computador.webp', 2400, 78)   # pág. 6: canta de perfil, faixas à esquerda
    webp(do_pdf(12), 'topo-celular.webp', 1400, 78)       # pág. 1: sorrindo com o microfone
    webp(do_pdf(11), 'textura-faixas.webp', 1920, 70)     # fundo de faixas diagonais
    for x, nome in BANDA.items():
        img = do_pdf(x)
        if x == 99:  # no PDF esta vem girada 90°
            img = img.rotate(90, expand=True)
        webp(img, nome + '.webp', 600)
    for x, nome in MULTIDAO.items():
        webp(do_pdf(x), nome + '.webp', 1000)
    # logo da produtora (branca sobre preto) -> branca com transparência
    lks = ImageOps.exif_transpose(Image.open(os.path.join(FOTOS, WHATS[15 - 1]))).convert('L')
    m = round(min(lks.size) * .03)  # a foto tem um fio claro na borda
    lks = lks.crop((m, m, lks.width - m, lks.height - m))
    caixa = lks.point(lambda v: 255 if v > 40 else 0).getbbox()
    lks = lks.crop(caixa)
    branca = Image.new('RGBA', lks.size, (255, 255, 255, 0))
    branca.putalpha(lks)
    branca.save(os.path.join(PUB, 'marca', 'lks-producoes.png'), optimize=True)
    for v in VIDEOS:
        webp(baixa(f'https://i.ytimg.com/vi/{v}/maxresdefault.jpg'), f'video-{v}.webp', 1280, 78)
    webp(baixa(CAPA_LANCAMENTO), 'capa-estrada-e-saudade.webp', 800)


def og():
    """Imagem de compartilhamento 1200x630: topo do computador + logo."""
    base = Image.open(os.path.join(PUB, 'fotos', 'topo-computador.webp')).convert('RGB')
    alvo_w, alvo_h = 1200, 630
    esc = max(alvo_w / base.width, alvo_h / base.height)
    base = base.resize((round(base.width * esc), round(base.height * esc)), Image.LANCZOS)
    top = (base.height - alvo_h) // 2
    base = base.crop((base.width - alvo_w, top, base.width, top + alvo_h))
    svg_txt = open(os.path.join(PUB, 'marca', 'lukas-santos.svg'), encoding='utf-8').read()
    tmp = os.path.join(PUB, 'marca', '_tmp.png')
    rasteriza(svg_txt, 520, tmp, alfa=True)
    marca = Image.open(tmp).convert('RGBA')
    os.remove(tmp)
    base.paste(marca, (70, (alvo_h - marca.height) // 2), marca)
    base.save(os.path.join(RAIZ, 'src', 'app', 'opengraph-image.jpg'), 'JPEG', quality=85, optimize=True)


if __name__ == '__main__':
    logo()
    fotos()
    og()
    print('mídia pronta')
