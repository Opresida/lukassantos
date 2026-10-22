'use client';
import { useEffect, useId, useState } from 'react';
import { EVENTOS, FORMATOS } from '@/data/conteudo';
import { linkWhatsApp } from '@/lib/site';
import { IconeWhatsApp } from './Icones';

const NAO_SEI = 'Ainda não sei (quero ajuda)';
export const ESCOLHE_FORMATO = 'ls:escolhe-formato';

/** Botão "Pedir orçamento" de um cartão de formato: já deixa o formato marcado no formulário. */
export function BotaoFormato({ formato }: { formato: string }) {
  return (
    <a href="#contratar" className="botao botao--contorno formato__cta" onClick={() => window.dispatchEvent(new CustomEvent(ESCOLHE_FORMATO, { detail: formato }))}>
      Pedir orçamento<span className="so-leitor"> do formato {formato}</span>
    </a>
  );
}

function dataBr(iso: string) {
  const [a, m, d] = iso.split('-');
  return `${d}/${m}/${a}`;
}

/** Pedido de orçamento sem banco: os campos viram uma mensagem pronta no WhatsApp da produção.
 *  Só o nome é obrigatório; data e formato aceitam "ainda não sei" para ninguém travar no formulário. */
export function FormContratar() {
  const id = useId();
  const [semData, setSemData] = useState(false);
  const [erro, setErro] = useState('');
  const [formato, setFormato] = useState('');

  // os cartões de formato (BotaoFormato) escolhem o formato aqui antes de rolar até o formulário
  useEffect(() => {
    const escolhe = (e: Event) => setFormato((e as CustomEvent<string>).detail);
    window.addEventListener(ESCOLHE_FORMATO, escolhe);
    return () => window.removeEventListener(ESCOLHE_FORMATO, escolhe);
  }, []);

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nome = String(f.get('nome') ?? '').trim();
    if (!nome) {
      setErro('Diga seu nome para a produção saber com quem está falando.');
      (e.currentTarget.elements.namedItem('nome') as HTMLInputElement | null)?.focus();
      return;
    }
    setErro('');
    const data = String(f.get('data') ?? '');
    const linhas = [
      'Olá! Vim pelo site e quero um orçamento de show do Lukas Santos.',
      '',
      `Nome: ${nome}`,
      `Evento: ${f.get('evento') || 'a combinar'}`,
      `Cidade: ${String(f.get('cidade') ?? '').trim() || 'a combinar'}`,
      `Data: ${semData || !data ? 'ainda não definida' : dataBr(data)}`,
      `Formato: ${f.get('formato') || NAO_SEI}`,
    ];
    const extra = String(f.get('detalhes') ?? '').trim();
    if (extra) linhas.push(`Detalhes: ${extra}`);
    window.open(linkWhatsApp(linhas.join('\n')), '_blank', 'noopener,noreferrer');
  };

  const hoje = new Date().toISOString().slice(0, 10);

  return (
    <form className="form" onSubmit={enviar} noValidate aria-describedby={`${id}-ajuda`}>
      <p id={`${id}-ajuda`} className="form__ajuda">Só o nome é obrigatório. O resto ajuda a produção a responder com o valor certo.</p>
      <div className="form__grade">
        <label className="campo campo--largo">
          <span className="campo__rotulo">Seu nome *</span>
          <input name="nome" autoComplete="name" required aria-invalid={erro ? true : undefined} aria-describedby={erro ? `${id}-erro` : undefined} />
        </label>
        <label className="campo">
          <span className="campo__rotulo">Tipo de evento</span>
          <select name="evento" defaultValue="">
            <option value="">Escolha</option>
            {EVENTOS.map((ev) => <option key={ev}>{ev}</option>)}
          </select>
        </label>
        <label className="campo">
          <span className="campo__rotulo">Cidade</span>
          <input name="cidade" autoComplete="address-level2" placeholder="Ex.: Manaus" />
        </label>
        <div className="campo">
          <label className="campo__rotulo" htmlFor={`${id}-data`}>Data do evento</label>
          <input id={`${id}-data`} name="data" type="date" min={hoje} disabled={semData} />
          <label className="campo__check">
            <input type="checkbox" checked={semData} onChange={(e) => setSemData(e.target.checked)} />
            <span>Ainda não tenho a data</span>
          </label>
        </div>
        <label className="campo">
          <span className="campo__rotulo">Formato do show</span>
          <select name="formato" value={formato} onChange={(e) => setFormato(e.target.value)}>
            <option value="">{NAO_SEI}</option>
            {FORMATOS.map((fm) => <option key={fm.id}>{fm.nome}</option>)}
          </select>
        </label>
        <label className="campo campo--largo">
          <span className="campo__rotulo">Algo mais? <span className="campo__opcional">(opcional)</span></span>
          <textarea name="detalhes" rows={3} placeholder="Horário, local, número de convidados, música especial…" />
        </label>
      </div>
      {erro && <p id={`${id}-erro`} className="form__erro" role="alert">{erro}</p>}
      <button type="submit" className="botao botao--laranja botao--grande form__enviar">
        <IconeWhatsApp /> Enviar pelo WhatsApp
      </button>
    </form>
  );
}
