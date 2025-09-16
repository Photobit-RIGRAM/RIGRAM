'use client';

import Button from '@/components/button';
import { PHOTO_DATA } from '@/mock/mockData';
import { Image, Images, Play } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function PhotoListPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'all';

  const RENDER_PHOTO =
    currentTab === 'all' ? PHOTO_DATA : PHOTO_DATA.filter((item) => item.category === currentTab);

  return (
    <section className="flex flex-col gap-2 w-full h-full bg-white rounded-xl p-5 overflow-y-scroll scrollbar-hide md:p-6">
      <header className="relative flex justify-between items-center md:px-6 md:py-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-16 text-gray-900 font-semibold md:text-20">
            사진 - {currentTab === 'all' ? '전체' : currentTab}
          </h3>
          <span className="flex items-center gap-1 text-14 text-gray-700 font-medium md:text-16">
            <Images />
            {`이미지${RENDER_PHOTO.filter((item) => item.type === 'photo').length}개, 동영상${RENDER_PHOTO.filter((item) => item.type === 'video').length}개`}
          </span>
        </div>
        <Button className="bg-gray-800 text-white rounded-full p-1.5 md:p-2.5 hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-700">
          <Image />
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-2 max-h-[500px] w-full">
        {RENDER_PHOTO.map((item) => (
          <div
            key={item.id}
            className="relative flex justify-center items-center bg-[#eee] h-[200px] rounded-lg overflow-hidden hover:cursor-pointer hover:scale-105 hover:opacity-70"
          >
            <img src={item.imgSrc} alt="" className="w-full h-full object-cover" />
            {item.type === 'video' && (
              <div className="absolute flex justify-center items-center w-[84px] h-[84px] bg-[#51515D] text-white opacity-60 rounded-full">
                <Play />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
