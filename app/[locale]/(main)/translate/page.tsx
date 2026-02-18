import type { Metadata } from 'next';
import TranslatorPage from '@/features/Translator/components/TranslatorPage';
import { StructuredData } from '@/shared/components/SEO/StructuredData';
import { generatePageMetadata } from '@/core/i18n/metadata-helpers';
import { routing } from '@/core/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export const revalidate = 3600;

interface TranslatePageProps {
  params: Promise<{ locale: string }>;
}

function getTranslatorSchema(locale: string) {
  const isEs = locale === 'es';

  const appName = isEs
    ? 'Traductor Japones de KanaDojo'
    : 'KanaDojo Japanese Translator';
  const pageName = isEs
    ? 'Traductor de Ingles a Japones'
    : 'English to Japanese Translator';
  const pageDescription = isEs
    ? 'Traduce texto entre ingles y japones con soporte de romaji y guia de aprendizaje.'
    : 'Translate text between English and Japanese with romaji support and learner-focused guidance.';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://kanadojo.com/translate#webpage',
        url: 'https://kanadojo.com/translate',
        name: pageName,
        inLanguage: locale,
        description: pageDescription,
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://kanadojo.com/translate#software',
        name: appName,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web',
        url: 'https://kanadojo.com/translate',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        isAccessibleForFree: true,
        inLanguage: ['en', 'es'],
        featureList: [
          'English to Japanese translation',
          'Japanese to English translation',
          'Romaji pronunciation support',
          'Translation history in browser storage',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://kanadojo.com/translate#faq',
        inLanguage: locale,
        mainEntity: [
          {
            '@type': 'Question',
            name: isEs
              ? 'El traductor es gratuito?'
              : 'Is this translator free to use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isEs
                ? 'Si. El traductor es gratuito y no requiere registro.'
                : 'Yes. The translator is free to use and does not require registration.',
            },
          },
          {
            '@type': 'Question',
            name: isEs
              ? 'Existe un limite de uso?'
              : 'Are there usage limits?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isEs
                ? 'Si. Se aplican limites de uso para mantener la estabilidad del servicio durante alta demanda.'
                : 'Yes. Usage limits apply to keep the service stable during high demand.',
            },
          },
          {
            '@type': 'Question',
            name: isEs
              ? 'Cual es la longitud maxima por traduccion?'
              : 'What is the maximum text length per translation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isEs
                ? 'Puedes traducir hasta 5,000 caracteres por solicitud.'
                : 'You can translate up to 5,000 characters per request.',
            },
          },
        ],
      },
    ],
  };
}

export async function generateMetadata({
  params,
}: TranslatePageProps): Promise<Metadata> {
  const { locale } = await params;
  return await generatePageMetadata('translate', {
    locale,
    pathname: '/translate',
  });
}

export default async function TranslatePage({ params }: TranslatePageProps) {
  const { locale } = await params;

  return (
    <>
      <StructuredData data={getTranslatorSchema(locale)} />
      <main className='min-h-screen'>
        <a
          href='#translator'
          className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-(--main-color) focus:px-4 focus:py-2 focus:text-white'
        >
          Skip to translator
        </a>
        <article
          itemScope
          itemType='https://schema.org/SoftwareApplication'
          id='translator'
        >
          <meta itemProp='name' content='KanaDojo Japanese Translator' />
          <meta itemProp='applicationCategory' content='EducationalApplication' />
          <meta itemProp='operatingSystem' content='Any' />
          <meta
            itemProp='description'
            content='Translate English and Japanese text with romaji support and learner-focused context.'
          />
          <TranslatorPage locale={locale} />
        </article>
      </main>
    </>
  );
}