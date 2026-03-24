'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { useLang } from '@/hooks/useLang';
import { useScrollPosition } from '@/hooks/useScrollPosition';

export default function Header() {
  const language = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const scrollPosition = useScrollPosition();
  const translate = useDictionary();

  const handleLanguageChange = (newLanguage: string) => {
    const newPath = pathname.replace(/^\/(ko|en)/, `/${newLanguage}`);
    router.push(newPath);
  };

  return (
    <header
      className={`z-10 w-full px-4 sm:px-12 font-bold text-lg sm:text-xl md:text-2xl bg-[#fff] fixed ${
        scrollPosition < 20 ? '' : 'border-solid border-b border-[#001b371a]'
      }`}
    >
      <div className="pb-4 pt-5 flex items-center justify-between">
        <Link href={`/${language}`} className="font-Tenada text-[#5A7C88]">
          {translate('myPokemonEncyclopedia')}
        </Link>
        <div className="text-xs sm:text-sm items-center hidden sm:flex">
          <img className="w-4 sm:w-5" src="/images/global.png" alt="다국어" />
          <button
            type="button"
            onClick={() => handleLanguageChange('en')}
            className={`${language === 'en' ? 'text-[#5A7C88]' : 'text-gray-100'} p-1 sm:p-2`}
          >
            {translate('english')}
          </button>
          <button
            type="button"
            onClick={() => handleLanguageChange('ko')}
            className={`${language === 'ko' ? 'text-[#5A7C88]' : 'text-gray-100'} p-1 sm:p-2`}
          >
            {translate('korean')}
          </button>
        </div>
        <div className="text-xs flex items-center sm:hidden">
          <img className="w-4 sm:w-5" src="/images/global.png" alt="다국어" />
          <button
            type="button"
            className="p-1 text-[#5A7C88]"
            onClick={() => handleLanguageChange(language === 'ko' ? 'en' : 'ko')}
          >
            {translate('english')}
            {translate('korean')}
          </button>
        </div>
      </div>
    </header>
  );
}
