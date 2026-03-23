import type { Metadata } from 'next';
import { POKEMON_TYPE_LIST, POKEMON_TYPE_LABELS_KO } from '@/constants/pokemon';
import type { Locale } from '@/lib/i18n/config';
import PokemonTypeClient from './type-client';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://my-pokepedia.pages.dev';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; type: string }>;
}): Promise<Metadata> {
  const { lang, type } = await params;
  const isKo = lang === 'ko';
  const typeName = isKo ? (POKEMON_TYPE_LABELS_KO[type] ?? type) : type;

  const title = isKo
    ? `${typeName} 타입 포켓몬 - 포켓몬 도감`
    : `${type.charAt(0).toUpperCase() + type.slice(1)} Type Pokemon - Pokedex`;

  const description = isKo
    ? `${typeName} 타입 포켓몬 목록을 확인하세요.`
    : `Browse all ${type} type Pokemon.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/pokemon/type/${type}`,
      languages: {
        ko: `${SITE_URL}/ko/pokemon/type/${type}`,
        en: `${SITE_URL}/en/pokemon/type/${type}`,
      },
    },
    openGraph: {
      title,
      description,
      locale: isKo ? 'ko_KR' : 'en_US',
      type: 'website',
    },
  };
}

export default async function PokemonTypePage({
  params,
}: {
  params: Promise<{ lang: string; type: string }>;
}) {
  const { lang, type } = await params;
  return <PokemonTypeClient lang={lang as Locale} type={type} />;
}
