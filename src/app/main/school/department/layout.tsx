'use client';

import BottomTab from '@/components/tab/bottom';
import TopTab from '@/components/tab/top';
import { usePathname } from 'next/navigation';

export default function DepartmentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hasPathname = pathname.includes('/department');

  return (
    <div className="relative flex flex-col gap-4 w-full h-full md:px-10 md:gap-8">
      <header className="flex justify-center md:justify-end items-center mt-4">
        <TopTab />
      </header>
      <main className="flex flex-col items-center gap-4 w-full h-full m-auto md:max-w-[1080px] md:gap-6">
        {children}
        {hasPathname && <BottomTab purpose="department" />}
      </main>
    </div>
  );
}
