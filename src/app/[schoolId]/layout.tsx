'use client';

import Header from '@/components/header';
import { usePathname } from 'next/navigation';

export default function SchoolLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const currentPage = segments[1];

  let mainClass = 'flex justify-center items-start flex-1 p-5 md:px-10 md:pb-0';
  if (currentPage === 'department') {
    mainClass += ' md:pt-5';
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header hasSchool />
      <main className={mainClass}>{children}</main>
    </div>
  );
}
