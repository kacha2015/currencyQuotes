"use client";

import { useEffect, useMemo, useState } from 'react';

type Quote = { venta: number; actualizado: string; cached?: boolean; stale?: boolean };

export function QuoteCard() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch('/api/blue', { cache: 'no-store' });
        if (!res.ok) throw new Error('No se pudo obtener la cotización');
        const data = (await res.json()) as Quote;
        if (active) { setQuote(data); setError(null); }
      } catch {
        if (active) setError('No se pudo actualizar la cotización en este momento.');
      }
    };
    load();
    const id = window.setInterval(load, 60_000);
    return () => { active = false; window.clearInterval(id); };
  }, []);

  const message = useMemo(() => quote ? `Dólar blue hoy en Argentina: venta $${quote.venta.toFixed(2)}. Actualizado ${quote.actualizado}.` : 'Dólar blue en tiempo real en Argentina.', [quote]);
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
    <section className="grid gap-4 rounded-3xl border border-sky-400/20 bg-slate-950/70 p-6 shadow-2xl shadow-black/30 lg:grid-cols-[1.3fr_0.7fr]">
      <div>
        <p className="text-sm text-sky-300">Cotización del día</p>
        <div className="mt-3 flex flex-wrap items-end gap-4">
          <div>
            <span className="text-sm text-slate-400">Venta</span>
            <div className="text-5xl font-black text-emerald-400">{quote ? `$${quote.venta.toFixed(2)}` : 'Cargando...'}</div>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-400">{quote ? `Última actualización: ${quote.actualizado}` : 'Obteniendo datos en vivo...'}</p>
        {quote?.cached ? <p className="mt-1 text-xs text-slate-500">Mostrando caché local.</p> : null}
        {quote?.stale ? <p className="mt-1 text-xs text-amber-300">Fuente temporalmente caída, usando último valor guardado.</p> : null}
        {error ? <p className="mt-3 text-sm text-rose-400">{error}</p> : null}
      </div>
      <div className="flex flex-col justify-between gap-3 rounded-2xl bg-white/5 p-5">
        <div>
          <p className="text-sm text-slate-400">Compartir</p>
          <p className="mt-1 text-lg font-semibold text-white">Enviar por WhatsApp</p>
        </div>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400">Compartir ahora</a>
      </div>
    </section>
  );
}
