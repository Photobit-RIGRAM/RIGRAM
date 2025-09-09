import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'RIGRAM',
  description: 'Photobit에서 제작한 학교별 졸업 앨범',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} antialiased`}>
      <body className="w-screen h-screen">
        <main className="w-full h-full">{children}</main>
      </body>
    </html>
  );
}
