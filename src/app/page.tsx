'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const schoolId = localStorage.getItem('schoolId');
    const token = localStorage.getItem('sb-access-token');
    if (token && schoolId) {
      router.push(`/${schoolId}`);
    } else {
      router.push('/login');
    }
  }, []);

  return (
    <section className="w-full h-full bg-blue flex justify-center items-center flex-col gap-10 md:gap-16">
      <div className="relative">
        <img
          src="/images/splash_img.png"
          alt="졸업은 새로운 시작입니다."
          className="object-cover"
        />
      </div>

      <div className="flex gap-2 text-20 text-white md:text-24">
        <span className="font-normal">제작</span>
        <strong className="font-bold">Photobit</strong>
      </div>
    </section>
  );
}
