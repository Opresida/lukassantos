import Image, { getImageProps } from 'next/image';
import { BotaoFormato, FormContratar } from '@/components/FormContratar';
import { Galeria } from '@/components/Galeria';
import { IconeDisco, IconeDownload, IconeEmail, IconeInstagram, IconeSeta, IconeSpotify, IconeTelefone, IconeYouTube } from '@/components/Icones';
import { Logo } from '@/components/Logo';
import { Revela } from '@/components/Revela';
import { Videos } from '@/components/Videos';
import { BANDA, BRASIL, ESTRADA, EVENTOS, FORMATOS, GALERIA, IMPRENSA, INTERIOR, LANCAMENTO, MANAUS, NUMEROS, RIDER, VIDEOS } from '@/data/conteudo';
import { DEEZER_URL, EMAIL, INSTAGRAM_URL, REEL_URL, SPOTIFY_URL, TELEFONE, WHATSAPP, YOUTUBE_MUSIC_URL, YOUTUBE_URL } from '@/lib/site';

function Topo() {
  // art direction: no celular a foto vertical (sorrindo com o microfone), no computador a horizontal do mídia kit
  const comum = { alt: 'Lukas Santos cantando ao vivo', sizes: '100vw', preload: true } as const;
  const { props: { srcSet: computador } } = getImageProps({ ...comum, src: '/fotos/topo-computador.webp', width: 2400, height: 1813, quality: 75 });
  const { props: { srcSet: celular, ...resto } } = getImageProps({ ...comum, src: '/fotos/topo-celular.webp', width: 1400, height: 1605, quality: 75 });
  return (
    <section id="topo" className="topo" aria-labelledby="topo-titulo">
      <picture className="topo__foto">
        <source media="(min-width: 900px)" srcSet={computador} />
        <source media="(max-width: 899px)" srcSet={celular} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- o alt vem de `resto` */}
        <img {...resto} />
      </picture>
      <div className="topo__veu" aria-hidden="true" />
      <div className="topo__conteudo conteudo">
        <Revela aguardaAbertura className="topo__texto">
          <p className="sobretitulo topo__sobretitulo">Sertanejo universitário · Forronejo · Manaus</p>
          <h1 id="topo-titulo" className="topo__titulo">
            <Logo className="topo__logo" titulo="Lukas Santos" />
          </h1>
          <p className="topo__frase">
            Quarenta mil pessoas cantaram junto na Avenida Itaúba. <strong>A próxima festa pode ser a sua.</strong>
          </p>
          <div className="topo__acoes">
            <a href="#contratar" className="botao botao--laranja botao--grande">Contratar show <IconeSeta /></a>
            <a href="#ao-vivo" className="botao botao--vidro botao--grande">Ver ao vivo</a>
          </div>
        </Revela>
      </div>
      <a href="#ao-vivo" className="topo__rolar" aria-label="Rolar para os vídeos"><span /></a>
    </section>
  );
}

function Cabeca({ sobre, titulo, texto, id }: { sobre: string; titulo: React.ReactNode; texto?: React.ReactNode; id: string }) {
  return (
    <Revela como="header" className="cabeca">
      <p className="sobretitulo">{sobre}</p>
      <h2 id={id} className="titulo">{titulo}</h2>
      {texto && <p className="cabeca__texto">{texto}</p>}
    </Revela>
  );
}

export default function Home() {
  return (
    <>
      <Topo />

      <section id="ao-vivo" className="secao secao--ao-vivo" aria-labelledby="ao-vivo-titulo">
        <div className="conteudo">
          <Cabeca id="ao-vivo-titulo" sobre="Ao vivo" titulo={<>Aperte o play.<br /><em>É assim no seu evento.</em></>}
            texto="Covers gravados ao vivo com a banda. Do modão à sofrência, o repertório que faz o salão inteiro cantar junto." />
          <Revela><Videos videos={VIDEOS} /></Revela>
          <div className="ao-vivo__links">
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="link-seta"><IconeYouTube /> Mais vídeos no YouTube</a>
            <a href={REEL_URL} target="_blank" rel="noopener noreferrer" className="link-seta"><IconeInstagram /> Reels no Instagram</a>
          </div>
        </div>
      </section>

      <section className="secao secao--prova" aria-labelledby="prova-titulo">
        <div className="prova__mural" aria-hidden="true">
          {['multidao-drone', 'multidao-1', 'multidao-3', 'multidao-2', 'multidao-4'].map((m) => (
            <div key={m} className="prova__foto"><Image src={`/fotos/${m}.webp`} alt="" fill sizes="(min-width: 900px) 20vw, 50vw" /></div>
          ))}
        </div>
        <div className="conteudo prova__conteudo">
          <h2 id="prova-titulo" className="so-leitor">A estrada em números</h2>
          <Revela como="ul" className="numeros">
            {NUMEROS.map((n, i) => (
              <li key={n.rotulo} className="numero" style={{ '--i': i } as React.CSSProperties}>
                <span className="numero__valor">{n.valor}</span>
                <span className="numero__rotulo">{n.rotulo}</span>
                <span className="numero__nota">{n.nota}</span>
              </li>
            ))}
          </Revela>
        </div>
      </section>

      <section id="formatos" className="secao secao--formatos" aria-labelledby="formatos-titulo">
        <div className="conteudo">
          <Cabeca id="formatos-titulo" sobre="Formatos de show" titulo={<>Do voz e violão<br /><em>ao palco completo.</em></>}
            texto="Escolha a formação que cabe no seu evento. O valor sai na conversa, de acordo com a data, a cidade e a estrutura." />
          <Revela como="ol" className="formatos">
            {FORMATOS.map((f, i) => (
              <li key={f.id} className="formato" style={{ '--i': i } as React.CSSProperties}>
                <span className="formato__num" aria-hidden="true">0{i + 1}</span>
                {f.destaque && <span className="formato__selo">{f.destaque}</span>}
                <h3 className="formato__nome">{f.nome}</h3>
                <ul className="formato__formacao">{f.formacao.map((x) => <li key={x}>{x}</li>)}</ul>
                <BotaoFormato formato={f.nome} />
              </li>
            ))}
          </Revela>
          <p className="formatos__nota"><strong>VS</strong> são as bases de apoio que tocam junto com a banda e deixam o som cheio em qualquer formação.</p>
          <Revela className="eventos">
            <h3 className="eventos__titulo">Toca em</h3>
            <ul className="eventos__lista">{EVENTOS.map((e) => <li key={e}>{e}</li>)}</ul>
          </Revela>
        </div>
      </section>

      <section id="lugares" className="secao secao--lugares" aria-labelledby="lugares-titulo">
        <div className="conteudo">
          <Cabeca id="lugares-titulo" sobre="Onde já tocou" titulo={<>Por onde<br /><em>a estrada passou.</em></>}
            texto="Bares, casas de show, praças e festas do interior. Do Clube do Municipal a Parintins, de Boa Vista a São Paulo." />
        </div>
        <div className="letreiro" aria-hidden="true">
          {[MANAUS.slice(0, 17), MANAUS.slice(17)].map((linha, l) => (
            <div key={l} className={`letreiro__linha${l ? ' letreiro__linha--volta' : ''}`}>
              <div className="letreiro__trilho">
                {[...linha, ...linha].map((nome, i) => <span key={i}>{nome}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div className="conteudo lugares">
          <Revela className="lugares__bloco">
            <h3 className="lugares__titulo"><span>{MANAUS.length}</span> casas e palcos em Manaus</h3>
            <ul className="lugares__nomes lugares__nomes--manaus">{MANAUS.map((n) => <li key={n}>{n}</li>)}</ul>
          </Revela>
          <Revela className="lugares__bloco">
            <h3 className="lugares__titulo"><span>{INTERIOR.length}</span> destinos no interior do Amazonas</h3>
            <ul className="lugares__nomes">{INTERIOR.map((n) => <li key={n}>{n}</li>)}</ul>
          </Revela>
          <Revela className="lugares__bloco">
            <h3 className="lugares__titulo"><span>{BRASIL.length}</span> cidades fora do estado</h3>
            <ul className="lugares__brasil">{BRASIL.map((c) => <li key={c.cidade}><span>{c.cidade}</span><abbr>{c.uf}</abbr></li>)}</ul>
          </Revela>
        </div>
      </section>

      <section id="estrada" className="secao secao--estrada" aria-labelledby="estrada-titulo">
        <div className="conteudo estrada">
          <div className="estrada__lado">
            <Cabeca id="estrada-titulo" sobre="A estrada" titulo={<>Das festas de família<br /><em>pro palco da estrada.</em></>} />
            <div className="estrada__retrato">
              <Image src="/fotos/estudio-chapeu.webp" alt="Lukas Santos de chapéu branco e jaqueta de couro" width={854} height={1280} sizes="(min-width: 900px) 34vw, 80vw" />
            </div>
          </div>
          <ol className="linha">
            {ESTRADA.map((m) => (
              <Revela como="li" key={m.quando} className="linha__marco">
                <span className="linha__quando">{m.quando}</span>
                <p>{m.texto}</p>
              </Revela>
            ))}
          </ol>
        </div>
        <div className="conteudo">
          <Revela className="lancamento">
            <Image src="/fotos/capa-estrada-e-saudade.webp" alt={`Capa de ${LANCAMENTO.titulo}`} width={800} height={800} sizes="(min-width: 640px) 220px, 60vw" className="lancamento__capa" />
            <div className="lancamento__texto">
              <p className="sobretitulo">Lançamento</p>
              <h3 className="lancamento__titulo">{LANCAMENTO.titulo}</h3>
              <ol className="lancamento__faixas">{LANCAMENTO.faixas.map((f) => <li key={f}>{f}</li>)}</ol>
              <div className="lancamento__acoes">
                <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" className="botao botao--laranja"><IconeSpotify /> Ouvir no Spotify</a>
                <a href={DEEZER_URL} target="_blank" rel="noopener noreferrer" className="botao botao--contorno"><IconeDisco /> Deezer</a>
                <a href={YOUTUBE_MUSIC_URL} target="_blank" rel="noopener noreferrer" className="botao botao--contorno"><IconeYouTube /> YouTube Music</a>
              </div>
            </div>
          </Revela>
        </div>
      </section>

      <section id="banda" className="secao secao--banda" aria-labelledby="banda-titulo">
        <div className="conteudo">
          <Cabeca id="banda-titulo" sobre="A banda" titulo={<>Seis músicos,<br /><em>um show só.</em></>}
            texto="A equipe sobe ao palco credenciada e com o repertório atualizado: do sertanejo raiz aos sucessos de agora, passando por modões e sofrência." />
          <Revela como="ul" className="banda">
            {BANDA.map((m, i) => (
              <li key={m.nome} className="musico" style={{ '--i': i } as React.CSSProperties}>
                <div className="musico__foto"><Image src={`/fotos/${m.foto}.webp`} alt={`${m.nome}, ${m.funcao.toLowerCase()}`} fill sizes="(min-width: 900px) 15vw, 40vw" /></div>
                <h3 className="musico__nome">{m.nome}</h3>
                <p className="musico__funcao">{m.funcao}</p>
              </li>
            ))}
          </Revela>
        </div>
      </section>

      <section id="fotos" className="secao secao--fotos" aria-labelledby="fotos-titulo">
        <div className="conteudo">
          <Cabeca id="fotos-titulo" sobre="Palco e estúdio" titulo={<>Fotos</>} />
          <Galeria fotos={GALERIA} />
          <div className="contratante">
            <Revela className="contratante__bloco">
              <h3 className="contratante__titulo"><IconeDownload /> Fotos em alta para divulgação</h3>
              <p>Para cartaz, post e imprensa. Clique para baixar.</p>
              <ul className="imprensa">
                {IMPRENSA.map((f) => (
                  <li key={f.arquivo}><a href={`/imprensa/${f.arquivo}`} download>{f.rotulo}</a></li>
                ))}
              </ul>
            </Revela>
            <Revela className="contratante__bloco">
              <details className="rider">
                <summary><h3 className="contratante__titulo">Rider técnico</h3><span className="rider__abre" aria-hidden="true" /></summary>
                <ol className="rider__lista">{RIDER.map((r) => <li key={r}>{r}</li>)}</ol>
                <p className="rider__nota">Todos os músicos usam credencial, mantendo a identificação profissional da equipe. Dúvidas técnicas: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
              </details>
            </Revela>
          </div>
        </div>
      </section>

      <section id="contratar" className="secao secao--contratar" aria-labelledby="contratar-titulo">
        <div className="conteudo contratar">
          <div className="contratar__lado">
            <Cabeca id="contratar-titulo" sobre="Contratar show" titulo={<>Garanta<br /><em>a data.</em></>}
              texto="Preencha o básico e a mensagem chega pronta no WhatsApp da produção." />
            <ul className="contratar__contatos">
              <li><a href={`tel:+${WHATSAPP}`}><IconeTelefone /> {TELEFONE}</a></li>
              <li><a href={`mailto:${EMAIL}`}><IconeEmail /> {EMAIL}</a></li>
              <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><IconeInstagram /> @lukassantos.lks</a></li>
            </ul>
          </div>
          <Revela className="contratar__form"><FormContratar /></Revela>
        </div>
      </section>
    </>
  );
}
