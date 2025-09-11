'use client';

import Badge from '@/components/badge';
import Button from '@/components/button';
import Input from '@/components/input';
import { ArrowLeft, Asterisk, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SchoolAddAdminPage() {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <section className="relative bg-white w-full p-4 md:p-10 border border-gray-200 rounded-xl shadow-dropdown overflow-visible md:w-[1080px] md:min-h-[753px]">
      <div className="absolute left-0 top-0 transform -translate-y-12 flex justify-start items-center gap-1 text-gray-900">
        <Button href={'/main'}>
          <ArrowLeft className="w-8 h-8" />
        </Button>
        <h3 className="text-20 font-semibold">학교 추가하기</h3>
      </div>
      <header className="relative flex flex-col justify-start gap-1">
        <ol className="flex justify-start items-center">
          <li>
            <Badge>기본 정보</Badge>
          </li>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          <li>
            <Badge active>행정 정보</Badge>
          </li>
        </ol>
        <h3 className="text-24 text-gray-900 font-semibold">행정 정보</h3>
        <div className="absolute right-0 bottom-0 flex items-center gap-2">
          <Button
            className="text-gray-900 bg-white border border-gray-300 rounded-lg px-3 py-1.5"
            onClick={handleGoBack}
          >
            뒤로 가기
          </Button>
          <Button className="text-white bg-primary-700 rounded-lg px-3 py-1.5">추가 하기</Button>
        </div>
      </header>
      <span className="inline-block w-full h-px bg-gray-200 my-8" aria-hidden="true"></span>
      <div className="flex flex-col gap-6">
        <div className="flex justify-start items-center w-full">
          <label
            htmlFor="school-admin-name"
            className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
          >
            담당자 이름
            <Asterisk className="text-red w-4 h-4" />
          </label>
          <div className="flex-1 min-w-0">
            <Input
              purpose="text"
              id="school-admin-name"
              placeholder="담당자 이름을 입력해 주세요."
              className="w-full"
            />
          </div>
        </div>
        <div className="flex justify-start items-start w-full flex-col md:flex-row md:items-center">
          <label
            htmlFor="school-admin-contact"
            className="flex justify-start items-center gap-0.5 text-18 text-gray-800 md:w-[200px]"
          >
            전화번호
            <Asterisk className="text-red w-4 h-4" />
          </label>
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Input purpose="text" id="school-admin-contact" placeholder="010" className="w-full" />
            <Input purpose="text" id="school-admin-contact" placeholder="1234" className="w-full" />
            <Input purpose="text" id="school-admin-contact" placeholder="5678" className="w-full" />
          </div>
        </div>
        <div className="flex justify-start items-center w-full">
          <label
            htmlFor="school-admin-email"
            className="flex justify-start items-center gap-0.5 text-18 text-gray-800 md:w-[200px]"
          >
            이메일
            <Asterisk className="text-red w-4 h-4" />
          </label>
          <div className="flex-1 min-w-0">
            <Input
              purpose="text"
              id="school-admin-email"
              placeholder="예) example@univ.com"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
