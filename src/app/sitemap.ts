import type { MetadataRoute } from 'next';
import { POKEMON_TYPE_LIST } from '@/constants/pokemon';
import { SITE_URL } from '@/constants/site';

const LOCALES = ['ko', 'en'];
const TOTAL_POKEMON = 1025;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // 메인 페이지
  for (const lang of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: { ko: `${SITE_URL}/ko`, en: `${SITE_URL}/en` },
      },
    });
  }

  // 포켓몬 상세 페이지
  for (let id = 1; id <= TOTAL_POKEMON; id++) {
    for (const lang of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${lang}/pokemon/${id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            ko: `${SITE_URL}/ko/pokemon/${id}`,
            en: `${SITE_URL}/en/pokemon/${id}`,
          },
        },
      });
    }
  }

  // 타입별 페이지
  for (const type of POKEMON_TYPE_LIST) {
    for (const lang of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${lang}/pokemon/type/${type}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            ko: `${SITE_URL}/ko/pokemon/type/${type}`,
            en: `${SITE_URL}/en/pokemon/type/${type}`,
          },
        },
      });
    }
  }

  return entries;
}
