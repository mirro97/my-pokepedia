import { Link } from "react-router-dom";
import { useLanguageValue, useSetLanguage } from "@/shared/hooks/useLanguage";
import { useScrollPosition } from "@/shared/hooks/useScrollPosition";
import { useTranslations } from "@/shared/hooks/useTranslations"; // Add useTranslations import

export const Header = () => {
  const lang = useLanguageValue();
  const setLang = useSetLanguage();
  const scrollPosition = useScrollPosition();
  const t = useTranslations(); // Initialize useTranslations hook
  return (
    <>
      <header
        className={`z-10 w-full px-4 sm:px-12  font-bold text-lg sm:text-xl md:text-2xl bg-[#fff] fixed  ${
          scrollPosition < 20 ? "" : "border-solid border-b border-[#001b371a]"
        }`}
      >
        <div className={`pb-4 pt-5  flex items-center justify-between`}>
          <Link to={"/"} className="font-Tenada text-[#5A7C88]">
            {t('myPokemonEncyclopedia')}
          </Link>
          <div className="text-xs sm:text-sm items-center hidden sm:flex">
            {/* 웹 */}
            <img className="w-4 sm:w-5" src="/images/global.png" alt="다국어" />
            <button
              onClick={() => setLang("en")}
              className={`${
                lang === "en" ? "text-[#5A7C88]" : "text-gray-100"
              } p-1 sm:p-2`}
            >
              {t('english')}
            </button>
            <button
              onClick={() => setLang("ko")}
              className={`${
                lang === "ko" ? "text-[#5A7C88]" : "text-gray-100"
              } p-1 sm:p-2`}
            >
              {t('korean')}
            </button>
          </div>

          {/* 모바일 */}
          <div className="text-xs flex items-center sm:hidden">
            <img className="w-4 sm:w-5" src="/images/global.png" alt="다국어" />
            <button
              className={"p-1 text-[#5A7C88]"}
              onClick={() => {
                if (lang === "ko")
                  setLang("en");
                else
                  setLang("ko");
              }}
            >
              {t('english')}
              {t('korean')}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
