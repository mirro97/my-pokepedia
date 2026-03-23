import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import MainPageClient from './main-client';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://my-pokepedia.pages.dev';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isKo = lang === 'ko';

  return {
    title: isKo ? '나만의 포켓몬 도감' : 'My Pokemon Pokedex',
    description: isKo
      ? '1025종 포켓몬의 정보, 타입, 진화, 스프라이트를 확인하세요.'
      : 'Browse information, types, evolutions, and sprites of 1025 Pokemon.',
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        ko: `${SITE_URL}/ko`,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: isKo ? '나만의 포켓몬 도감' : 'My Pokemon Pokedex',
      description: isKo
        ? '1025종 포켓몬의 정보, 타입, 진화, 스프라이트를 확인하세요.'
        : 'Browse information, types, evolutions, and sprites of 1025 Pokemon.',
      locale: isKo ? 'ko_KR' : 'en_US',
      type: 'website',
    },
  };
}

export default async function MainPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <MainPageClient lang={lang as Locale} />;
}
