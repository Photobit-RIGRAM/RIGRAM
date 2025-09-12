'use client';

import BottomTab from '@/components/tab/bottom';
import TopTab from '@/components/tab/top';
import { usePathname } from 'next/navigation';

export default function DepartmentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hasPathname = pathname.includes('/department/detail');

  return (
    <div className="relative flex flex-col gap-8 w-full h-full md:px-10">
      <header className="flex justify-center md:justify-end items-center mt-4">
        <TopTab />
      </header>
      <main className="flex flex-col items-center gap-6 w-full h-full m-auto md:max-w-[1080px]">
        {children}
        {hasPathname && <BottomTab purpose="department" />}
      </main>
    </div>
  );
}
