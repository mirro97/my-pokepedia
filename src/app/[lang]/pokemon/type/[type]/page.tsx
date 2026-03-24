import type { Metadata } from 'next';
import PokemonTypeExplorer from '@/components/pokemon/PokemonTypeExplorer';
import { POKEMON_TYPE_LABELS_KO } from '@/constants/pokemon';
import { SITE_URL } from '@/constants/site';

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; type: string }>;
}): Promise<Metadata> {
  const { lang: language, type } = await params;
  const isKo = language === 'ko';
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
      canonical: `${SITE_URL}/${language}/pokemon/type/${type}`,
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
  const { type } = await params;
  return <PokemonTypeExplorer type={type} />;
}
