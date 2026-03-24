interface FooterProps {
  language: string;
}

export default function Footer({ language }: FooterProps) {
  return (
    <footer className="bg-[#5A7C88] p-10">
      <div className="text-gray-100 text-center">
        {language === 'en'
          ? 'This page was created for personal portfolio purposes only, not for commercial use.'
          : '본 페이지는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.'}
        <br />© 2023 Kang, Su-Jeong. All Rights Reserved.
      </div>
    </footer>
  );
}
