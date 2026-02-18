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
    pathname: '/translate/romaji',
  });

  return {
    ...base,
    title: 'Romaji Translator Guide (Japanese to Romaji) | KanaDojo',
    description:
      'Learn how to use Japanese to romaji output for pronunciation and reading support, with practical checks for kana and kanji text.',
  };
}

export default async function RomajiPage({ params }: PageProps) {
  const { locale } = await params;
  const isEs = locale === 'es';

  return (
    <main className='mx-auto max-w-4xl px-4 py-10'>
      <h1 className='text-3xl font-bold text-(--main-color)'>
        {isEs ? 'Guia de Traductor Romaji Japones' : 'Japanese to Romaji Translator Guide'}
      </h1>
      <p className='mt-4 text-(--secondary-color)'>
        {isEs
          ? 'Romaji representa texto japones con alfabeto latino. Es util para pronunciacion inicial y verificacion rapida del resultado.'
          : 'Romaji represents Japanese text using the Latin alphabet. It is useful for early pronunciation and quick output checks.'}
      </p>
      <h2 className='mt-6 text-xl font-semibold text-(--main-color)'>
        {isEs ? 'Como usar romaji correctamente' : 'How to use romaji correctly'}
      </h2>
      <ul className='mt-3 list-disc space-y-2 pl-5 text-(--secondary-color)'>
        <li>{isEs ? 'Usalo para leer y pronunciar palabras nuevas.' : 'Use it to read and pronounce new words.'}</li>
        <li>{isEs ? 'Verifica con hiragana/katakana cuando sea posible.' : 'Cross-check against hiragana/katakana when possible.'}</li>
        <li>{isEs ? 'No reemplaza estudio de escritura japonesa.' : 'Do not treat it as a replacement for Japanese script study.'}</li>
      </ul>
      <div className='mt-8 flex flex-wrap gap-3'>
        <Link href='/translate' className='rounded-lg border border-(--border-color) px-4 py-2 font-medium text-(--main-color)'>
          {isEs ? 'Abrir traductor principal' : 'Open main translator'}
        </Link>
        <Link href='/kana' className='rounded-lg border border-(--border-color) px-4 py-2 font-medium text-(--main-color)'>
          {isEs ? 'Practicar Kana' : 'Practice Kana'}
        </Link>
      </div>
    </main>
  );
}
