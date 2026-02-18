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
    pathname: '/translate/japanese-to-english',
  });

  return {
    ...base,
    title: 'Japanese to English Translator | KanaDojo',
    description:
      'Translate Japanese to English with support for hiragana, katakana, and kanji text. Built for learners and quick comprehension checks.',
  };
}

export default async function JapaneseToEnglishPage({ params }: PageProps) {
  const { locale } = await params;
  const isEs = locale === 'es';

  return (
    <main className='mx-auto max-w-4xl px-4 py-10'>
      <h1 className='text-3xl font-bold text-(--main-color)'>
        {isEs ? 'Traductor de Japones a Ingles' : 'Japanese to English Translator'}
      </h1>
      <p className='mt-4 text-(--secondary-color)'>
        {isEs
          ? 'Traduce hiragana, katakana y kanji a ingles para revisar significado, contexto y comprension general.'
          : 'Translate hiragana, katakana, and kanji into English to validate meaning, context, and overall comprehension.'}
      </p>
      <ul className='mt-6 list-disc space-y-2 pl-5 text-(--secondary-color)'>
        <li>{isEs ? 'Ideal para subtitulos, notas de estudio y lectura.' : 'Useful for subtitles, study notes, and reading practice.'}</li>
        <li>{isEs ? 'Manejo de texto mixto en todos los sistemas de escritura japoneses.' : 'Handles mixed Japanese scripts in one request.'}</li>
        <li>{isEs ? 'Incluye limites de uso para mantener estabilidad del servicio.' : 'Includes fair-use rate limits to keep service stable.'}</li>
      </ul>
      <div className='mt-8 flex flex-wrap gap-3'>
        <Link href='/translate' className='rounded-lg border border-(--border-color) px-4 py-2 font-medium text-(--main-color)'>
          {isEs ? 'Abrir traductor principal' : 'Open main translator'}
        </Link>
        <Link href='/translate/english-to-japanese' className='rounded-lg border border-(--border-color) px-4 py-2 font-medium text-(--main-color)'>
          {isEs ? 'Ingles a Japones' : 'English to Japanese'}
        </Link>
        <Link href='/translate/romaji' className='rounded-lg border border-(--border-color) px-4 py-2 font-medium text-(--main-color)'>
          {isEs ? 'Guia de Romaji' : 'Romaji guide'}
        </Link>
      </div>
    </main>
  );
}