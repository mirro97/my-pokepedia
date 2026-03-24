import type { Metadata } from 'next';
import PokemonExplorer from '@/components/pokemon/PokemonExplorer';
import { SITE_URL } from '@/constants/site';

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: language } = await params;
  const isKo = language === 'ko';

  return {
    title: isKo ? '나만의 포켓몬 도감' : 'My Pokemon Pokedex',
    description: isKo
      ? '1025종 포켓몬의 정보, 타입, 진화, 스프라이트를 확인하세요.'
      : 'Browse information, types, evolutions, and sprites of 1025 Pokemon.',
    alternates: {
      canonical: `${SITE_URL}/${language}`,
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

export default function MainPage() {
  return <PokemonExplorer />;
}
