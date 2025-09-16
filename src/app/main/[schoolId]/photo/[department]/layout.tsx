'use client';

import Button from '@/components/button';
import BottomTab from '@/components/tab/bottom';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PhotoListLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="relative flex flex-col w-full h-full">
      <header className="flex justify-start items-center gap-1 text-gray-900 mb-2 md:mb-4">
        <Button onClick={handleGoBack}>
          <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
        </Button>
        <h3 className="text-18 md:text-20 font-semibold">학과명0</h3>
      </header>
      <main className="flex flex-col items-center gap-4 w-full h-full m-auto md:max-w-[1080px] md:gap-6">
        {children}
      </main>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 min-w-fit">
        <BottomTab purpose="organization" />
      </div>
    </div>
  );
}
