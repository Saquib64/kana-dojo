import type { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/core/i18n/metadata-helpers';
import { routing } from '@/core/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const base = await generatePageMetadata('translate', {
    locale,
    pathname: '/translate/english-to-japanese',
  });

  return {
    ...base,
    title: 'English to Japanese Translator Online | KanaDojo',
    description:
      'Translate English to Japanese online for free. Get Japanese text with romaji support for pronunciation and study.',
  };
}

export default async function EnglishToJapanesePage({ params }: PageProps) {
  const { locale } = await params;
  const isEs = locale === 'es';

  return (
    <main className='mx-auto max-w-4xl px-4 py-10'>
      <h1 className='text-3xl font-bold text-(--main-color)'>
        {isEs ? 'Traductor Online de Ingles a Japones' : 'English to Japanese Translator Online'}
      </h1>
      <p className='mt-4 text-(--secondary-color)'>
        {isEs
          ? 'Usa esta pagina para traducir frases y parrafos de ingles a japones, revisar romaji y continuar con practica de lectura.'
          : 'Use this page to translate phrases and paragraphs from English to Japanese, review romaji, and continue with reading practice.'}
      </p>
      <ul className='mt-6 list-disc space-y-2 pl-5 text-(--secondary-color)'>
        <li>{isEs ? 'Traduccion para frases cotidianas y estudio JLPT.' : 'Translation for everyday phrases and JLPT study.'}</li>
        <li>{isEs ? 'Salida con japones y romaji para pronunciacion.' : 'Output includes Japanese text and romaji for pronunciation.'}</li>
        <li>{isEs ? 'Limite de 5,000 caracteres por solicitud.' : '5,000 character limit per request.'}</li>
      </ul>
      <div className='mt-8 flex flex-wrap gap-3'>
        <Link href='/translate' className='rounded-lg border border-(--border-color) px-4 py-2 font-medium text-(--main-color)'>
          {isEs ? 'Abrir traductor principal' : 'Open main translator'}
        </Link>
        <Link href='/translate/japanese-to-english' className='rounded-lg border border-(--border-color) px-4 py-2 font-medium text-(--main-color)'>
          {isEs ? 'Japones a Ingles' : 'Japanese to English'}
        </Link>
        <Link href='/translate/romaji' className='rounded-lg border border-(--border-color) px-4 py-2 font-medium text-(--main-color)'>
          {isEs ? 'Guia de Romaji' : 'Romaji guide'}
        </Link>
      </div>
    </main>
  );
}
