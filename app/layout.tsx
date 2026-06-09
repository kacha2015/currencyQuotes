import './globals.css';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Dólar Blue en Tiempo Real', template: '%s | Dólar Blue' },
  description: 'Cotización del dólar blue en Argentina con botón para compartir por WhatsApp.',
  openGraph: {
    title: 'Dólar Blue en Tiempo Real',
    description: 'Cotización del dólar blue en Argentina con botón para compartir por WhatsApp.',
    url: '/',
    siteName: 'Dólar Blue en Tiempo Real',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dólar Blue en Tiempo Real',
    description: 'Cotización del dólar blue en Argentina con botón para compartir por WhatsApp.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
