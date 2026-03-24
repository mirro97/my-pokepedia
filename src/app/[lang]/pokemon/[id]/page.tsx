import type { Metadata } from 'next';
import PokemonDetailBox from '@/components/pokemon/PokemonDetailBox';
import { SITE_URL } from '@/constants/site';
import { ONE_DAY } from '@/constants/time';
import { fetchPokemon, fetchPokemonSpecies } from '@/lib/api';
import type { PokemonDetailType, PokemonSpecies } from '@/lib/types';
import { getLocalizedPokemonInfo } from '@/lib/utils';

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang: language, id } = await params;

  try {
    const revalidateOptions = { next: { revalidate: ONE_DAY } } as RequestInit;
    const [pokemon, species] = await Promise.all([
      fetchPokemon(id, revalidateOptions),
      fetchPokemonSpecies(id, revalidateOptions),
    ]);

    const { name, description, image } = getLocalizedPokemonInfo(pokemon, species, language);

    const title =
      language === 'ko'
        ? `${name} - 포켓몬 도감 #${pokemon.id}`
        : `${name} - Pokemon Pokedex #${pokemon.id}`;

    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/${language}/pokemon/${id}`,
        languages: {
          ko: `${SITE_URL}/ko/pokemon/${id}`,
          en: `${SITE_URL}/en/pokemon/${id}`,
        },
      },
      openGraph: {
        title,
        description,
        images: image ? [{ url: image, width: 475, height: 475 }] : [],
        type: 'article',
        locale: language === 'ko' ? 'ko_KR' : 'en_US',
      },
      twitter: {
        card: 'summary',
        title,
        description,
        images: image ? [image] : [],
      },
    };
  } catch {
    return { title: 'Pokemon Not Found' };
  }
}

function PokemonJsonLd({
  pokemon,
  species,
  language,
}: {
  pokemon: PokemonDetailType;
  species: PokemonSpecies;
  language: string;
}) {
  const { name, description, image } = getLocalizedPokemonInfo(pokemon, species, language);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name,
    description,
    image,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${language}/pokemon/${pokemon.id}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang: language, id } = await params;

  try {
    const revalidateOptions = { next: { revalidate: ONE_DAY } } as RequestInit;
    const [pokemon, species] = await Promise.all([
      fetchPokemon(id, revalidateOptions),
      fetchPokemonSpecies(id, revalidateOptions),
    ]);

    return (
      <div className="max-w-screen-lg mx-auto py-24 px-5">
        <PokemonJsonLd pokemon={pokemon} species={species} language={language} />
        <PokemonDetailBox pokemonInfo={pokemon} pokemonSpeciesInfo={species} />
      </div>
    );
  } catch {
    return (
      <div className="max-w-screen-lg mx-auto py-24 px-5 flex flex-col items-center">
        <p className="mb-14">Pokemon not found</p>
      </div>
    );
  }
}
