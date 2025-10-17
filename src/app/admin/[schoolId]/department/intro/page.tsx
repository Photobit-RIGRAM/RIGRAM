'use client';

import Button from '@/components/button';
import { ArrowLeft, PencilLine } from 'lucide-react';
import Image from 'next/image';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function DepartmentIntroPage() {
  return (
    <section className="relative w-full h-full bg-white rounded-xl p-4 border border-border md:max-h-[728px] md:p-10">
      <div className="relative mb-4 md:absolute md:left-0 md:top-0 md:transform md:-translate-y-12 flex justify-start items-center gap-1 text-gray-900">
        <Button href={'/main/school/department'}>
          <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
        </Button>
        <h3 className="text-18 md:text-20 font-semibold">학과명0</h3>
      </div>
      <div className="flex flex-col w-full h-full gap-4 md:gap-6">
        <header className="flex justify-between items-center">
          <h3 className="text-20 text-gray-900 font-semibold">학과 소개</h3>
          <Button className="flex items-center gap-1 text-gray-600">
            <PencilLine className="w-4 h-4" />
            <span>소개 수정하기</span>
          </Button>
        </header>
        <Swiper
          className="relative w-full h-full flex-1 min-h-0 overflow-hidden"
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
        >
          <SwiperSlide className="relative aspect-[4/3]">
            <Image
              src="https://cdn.pixabay.com/photo/2025/08/09/16/51/wildlife-9764923_1280.jpg"
              alt="학과명0 대표이미지"
              className="w-full h-full object-cover rounded-xl bg-opacity-15"
            />
            <div className="absolute top-0 left-0 flex flex-col justify-between w-full h-full text-white md:max-w-1/2 p-5 md:p-10">
              <div className="flex flex-col gap-1">
                <h3 className="text-24 font-bold">제목</h3>
                <span className="text-20 font-medium">서브제목</span>
              </div>
              <p>
                백학의 순백으로 빛나는 몸, 고고한 자태와 날개를 쫙 펴고 비상하는 백학의 모습은
                세속의 복잡한 이해관계로부터 초연해 오직 학문의 정도를 걸으며 날개를 펴고 비상을
                준비하는 서울대학교의 의지가 담겨 있습니다. 쌍학은 1998년 10월 14일, 모교 개교
                52주년 기념식에 맞춰 학의 활짝 펼친 날개와 다리 모습을 표현한 모교 상징
                조형물입니다.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative aspect-[4/3]">
            <Image
              src="https://cdn.pixabay.com/photo/2025/08/09/16/51/wildlife-9764923_1280.jpg"
              alt="학과명0 대표이미지"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute top-0 left-0 flex flex-col justify-between w-full h-full text-white md:max-w-1/2 p-5 md:p-10">
              <div className="flex flex-col gap-1">
                <h3 className="text-24 font-bold">제목</h3>
                <span className="text-20 font-medium">서브제목</span>
              </div>
              <p>
                백학의 순백으로 빛나는 몸, 고고한 자태와 날개를 쫙 펴고 비상하는 백학의 모습은
                세속의 복잡한 이해관계로부터 초연해 오직 학문의 정도를 걸으며 날개를 펴고 비상을
                준비하는 서울대학교의 의지가 담겨 있습니다. 쌍학은 1998년 10월 14일, 모교 개교
                52주년 기념식에 맞춰 학의 활짝 펼친 날개와 다리 모습을 표현한 모교 상징
                조형물입니다.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative aspect-[4/3]">
            <Image
              src="https://cdn.pixabay.com/photo/2025/08/09/16/51/wildlife-9764923_1280.jpg"
              alt="학과명0 대표이미지"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute top-0 left-0 flex flex-col justify-between w-full h-full text-white md:max-w-1/2 p-5 md:p-10">
              <div className="flex flex-col gap-1">
                <h3 className="text-24 font-bold">제목</h3>
                <span className="text-20 font-medium">서브제목</span>
              </div>
              <p>
                백학의 순백으로 빛나는 몸, 고고한 자태와 날개를 쫙 펴고 비상하는 백학의 모습은
                세속의 복잡한 이해관계로부터 초연해 오직 학문의 정도를 걸으며 날개를 펴고 비상을
                준비하는 서울대학교의 의지가 담겨 있습니다. 쌍학은 1998년 10월 14일, 모교 개교
                52주년 기념식에 맞춰 학의 활짝 펼친 날개와 다리 모습을 표현한 모교 상징
                조형물입니다.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative aspect-[4/3]">
            <Image
              src="https://cdn.pixabay.com/photo/2025/08/09/16/51/wildlife-9764923_1280.jpg"
              alt="학과명0 대표이미지"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute top-0 left-0 flex flex-col justify-between w-full h-full text-white md:max-w-1/2 p-5 md:p-10">
              <div className="flex flex-col gap-1">
                <h3 className="text-24 font-bold">제목</h3>
                <span className="text-20 font-medium">서브제목</span>
              </div>
              <p>
                백학의 순백으로 빛나는 몸, 고고한 자태와 날개를 쫙 펴고 비상하는 백학의 모습은
                세속의 복잡한 이해관계로부터 초연해 오직 학문의 정도를 걸으며 날개를 펴고 비상을
                준비하는 서울대학교의 의지가 담겨 있습니다. 쌍학은 1998년 10월 14일, 모교 개교
                52주년 기념식에 맞춰 학의 활짝 펼친 날개와 다리 모습을 표현한 모교 상징
                조형물입니다.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
