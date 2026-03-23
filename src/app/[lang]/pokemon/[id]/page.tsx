import type { Metadata } from 'next';
import { fetchPokemon, fetchPokemonSpecies } from '@/lib/api';
import PokemonDetailBox from '@/components/pokemon/PokemonDetailBox';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://my-pokepedia.pages.dev';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;

  try {
    const [pokemon, species] = await Promise.all([
      fetchPokemon(id),
      fetchPokemonSpecies(id),
    ]);

    const nameEntry = (species.names as any[])?.find(
      (n: any) => n.language.name === lang
    );
    const name = nameEntry?.name || pokemon.name;

    const flavorEntry = (species.flavor_text_entries as any[])?.find(
      (f: any) => f.language.name === lang
    );
    const description = flavorEntry?.flavor_text?.replace(/\n/g, ' ') || '';

    const title = lang === 'ko'
      ? `${name} - 포켓몬 도감 #${pokemon.id}`
      : `${name} - Pokemon Pokedex #${pokemon.id}`;

    const image = pokemon.sprites?.other?.['official-artwork']?.front_default
      || pokemon.sprites?.front_default;

    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/${lang}/pokemon/${id}`,
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
        locale: lang === 'ko' ? 'ko_KR' : 'en_US',
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
  lang,
}: {
  pokemon: any;
  species: any;
  lang: string;
}) {
  const nameEntry = (species.names as any[])?.find(
    (n: any) => n.language.name === lang
  );
  const name = nameEntry?.name || pokemon.name;
  const flavorEntry = (species.flavor_text_entries as any[])?.find(
    (f: any) => f.language.name === lang
  );
  const description = flavorEntry?.flavor_text?.replace(/\n/g, ' ') || '';
  const image = pokemon.sprites?.other?.['official-artwork']?.front_default;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name,
    description,
    image,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${lang}/pokemon/${pokemon.id}`,
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
  const { lang, id } = await params;

  try {
    const [pokemon, species] = await Promise.all([
      fetchPokemon(id),
      fetchPokemonSpecies(id),
    ]);

    return (
      <div className="max-w-screen-lg mx-auto py-24 px-5">
        <PokemonJsonLd pokemon={pokemon} species={species} lang={lang} />
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
