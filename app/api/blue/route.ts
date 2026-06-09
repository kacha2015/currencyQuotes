type Quote = { venta: number; actualizado: string; source?: string };
const CACHE_TTL_MS = 2 * 60 * 1000;
let cachedQuote: Quote | null = null;
let cachedAt = 0;

async function fetchJson(url: string) {
  const res = await fetch(url, { headers: { accept: 'application/json' }, cache: 'no-store' });
  if (!res.ok) throw new Error(`Bad response from ${url}`);
  return res.json();
}

async function getLiveQuote(): Promise<Quote> {
  const sources = [
    async () => { const data = await fetchJson('https://dolarapi.com/v1/dolares/blue'); return { venta: Number(data.venta), source: 'dolarapi.com' }; },
    async () => { const data = await fetchJson('https://criptoya.com/api/dolar'); return { venta: Number(data.blue?.venta), source: 'criptoya.com' }; },
  ];
  for (const source of sources) {
    try {
      const quote = await source();
      if (Number.isFinite(quote.venta)) {
        return {
          ...quote,
          actualizado: new Intl.DateTimeFormat('es-AR', {
            timeZone: 'America/Argentina/Buenos_Aires',
            dateStyle: 'short',
            timeStyle: 'short',
          }).format(new Date()),
        };
      }
    } catch {}
  }
  throw new Error('No provider available');
}

export async function GET() {
  if (cachedQuote && Date.now() - cachedAt < CACHE_TTL_MS) return Response.json({ ...cachedQuote, cached: true });
  try {
    const quote = await getLiveQuote();
    cachedQuote = quote; cachedAt = Date.now();
    return Response.json({ ...quote, cached: false });
  } catch {
    if (cachedQuote) return Response.json({ ...cachedQuote, cached: true, stale: true });
    return Response.json({ error: 'No disponible' }, { status: 502 });
  }
}
