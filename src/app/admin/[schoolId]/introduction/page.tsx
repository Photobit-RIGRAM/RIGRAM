'use client';

import Executive from '@/components/executive';
import Foreground from '@/components/foreground';
import History from '@/components/history';
import PageHeader from '@/components/pageHeader';
import Symbol from '@/components/symbol';
import BottomTab from '@/components/tab/bottom';
import { useSchoolStore } from '@/store/useSchoolStore';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';

export default function IntroductionPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { schoolId, activeTab } = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    return {
      schoolId: segments[1],
      activeTab: searchParams.get('tab'),
    };
  }, [pathname.toString()]);

  const { school } = useSchoolStore();

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PageHeader title={`${school?.school_name} 소개`} />
      <section
        className="relative w-full h-full bg-white rounded-xl p-4 border border-border md:max-h-[728px] md:p-10"
        aria-labelledby="department-info"
      >
        {activeTab === 'foreground' && <Foreground />}
        {activeTab === 'history' && <History />}
        {activeTab === 'symbol' && <Symbol />}
        {activeTab === 'executive' && <Executive />}

        {/* 하단 탭 */}
        <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 min-w-fit">
          <BottomTab purpose="school_intro" />
        </footer>
      </section>
    </Suspense>
  );
}
