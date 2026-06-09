import { QuoteCard } from '../components/quote-card';

export default function Home() {
  return (
    <main className="min-h-screen bg-hero-gradient px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-sky-950/40 backdrop-blur">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-sky-300">Argentina</p>
          <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-6xl">Dólar blue en tiempo real, listo para compartir</h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">Seguimiento de la cotización del dólar blue con actualización automática y enlace para enviar por WhatsApp.</p>
        </section>
        <QuoteCard />
      </div>
    </main>
  );
}
