'use client';

import splashImg from '../../public/images/splash_img.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      console.log('ok');
      router.push('/login');
    }, 3000);
  }, []);

  return (
    <section className="w-full h-full bg-blue flex justify-center items-center flex-col gap-10 md:gap-16">
      <div className="relative w-3/4 h-1/4 md:w-[300px]">
        <Image
          src={splashImg}
          alt="졸업은 새로운 시작입니다."
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div className="flex gap-2 text-20 text-white md:text-24">
        <span className="font-normal">제작</span>
        <strong className="font-bold">Photobit</strong>
      </div>
    </section>
  );
}
