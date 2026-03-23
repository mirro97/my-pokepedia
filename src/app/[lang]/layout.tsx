import type { Metadata } from 'next';
import Script from 'next/script';
import { getDictionary } from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import QueryProvider from '@/components/providers/QueryProvider';
import { DictionaryProvider } from '@/components/providers/DictionaryProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SetHtmlLang from '@/components/layout/SetHtmlLang';

export const metadata: Metadata = {
  title: '나만의 포켓몬 도감',
  description: '1025종 포켓몬의 정보, 타입, 진화, 스프라이트를 확인하세요.',
  other: {
    'google-adsense-account': 'ca-pub-3873060133678296',
  },
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KSP7LZS9');`}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KSP7LZS9"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <SetHtmlLang lang={lang} />
      <QueryProvider>
        <DictionaryProvider dictionary={dictionary}>
          <div className="flex flex-col h-full">
            <Header />
            {children}
            <Footer lang={lang} />
          </div>
        </DictionaryProvider>
      </QueryProvider>
    </>
  );
}
