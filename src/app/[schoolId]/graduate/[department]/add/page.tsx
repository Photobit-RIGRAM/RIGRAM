'use client';

import Badge from '@/components/badge';
import Button from '@/components/button';
import FileInput from '@/components/fileInput';
import Input from '@/components/input';
import { ArrowLeft, Asterisk } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GraduateAddPage() {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <section className="relative bg-white w-full p-4 md:p-10 border border-gray-200 rounded-xl shadow-dropdown md:w-[1080px] md:min-h-[753px]">
      <div className="z-10 absolute left-0 top-0 transform -translate-y-12 flex justify-start items-center gap-1 text-gray-900">
        <Button onClick={handleGoBack}>
          <ArrowLeft className="w-8 h-8" />
        </Button>
        <h3 className="text-20 font-semibold">졸업생 추가하기</h3>
      </div>
      <header className="relative flex flex-col justify-start gap-1">
        <ol className="flex justify-start items-center">
          <li>
            <Badge active>졸업생 정보</Badge>
          </li>
        </ol>
        <h3 className="text-24 text-gray-900 font-semibold">졸업생 정보</h3>
        <div className="absolute right-0 bottom-0 flex items-center gap-2">
          <Button className="text-white bg-primary-700 rounded-lg px-3 py-1.5">추가하기</Button>
        </div>
      </header>
      <span className="inline-block w-full h-px bg-gray-200 my-8" aria-hidden="true"></span>
      <div className="flex flex-col gap-6">
        <div className="flex justify-start items-center w-full">
          <label
            htmlFor="graduate-name"
            className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
          >
            이름
            <Asterisk className="text-red w-4 h-4" />
          </label>
          <div className="flex-1 min-w-0">
            <Input
              purpose="text"
              id="graduate-name"
              placeholder="졸업생의 이름을 입력해 주세요.(80자 제한)"
              className="w-full"
            />
          </div>
        </div>
        <div className="flex justify-start items-center w-full">
          <label
            htmlFor="graduate-en-name"
            className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
          >
            영어 이름
            <Asterisk className="text-red w-4 h-4" />
          </label>
          <div className="flex-1 min-w-0">
            <Input
              purpose="text"
              id="graduate-en-name"
              placeholder="졸업생의 영어 이름을 입력해 주세요.(80자 제한)"
              className="w-full"
            />
          </div>
        </div>
        <div className="flex justify-start items-center w-full">
          <label
            htmlFor="graduate-en-name"
            className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
          >
            학과
          </label>
          <div className="flex-1 min-w-0">
            <Input
              purpose="text"
              id="graduate-en-name"
              placeholder="졸업생의 영어 이름을 입력해 주세요.(80자 제한)"
              className="w-full"
              value={'해당학과이름'}
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
        <div className="flex justify-start items-start">
          <label
            htmlFor="school-logo"
            className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
          >
            프로필 이미지
            <Asterisk className="text-red w-4 h-4" />
          </label>
          <div className="flex-1 min-w-0">
            <FileInput id="school-logo" className="w-full h-full" size="lg" />
          </div>
        </div>
        <div className="flex justify-start items-start">
          <label
            htmlFor="school-logo"
            className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
          >
            학사모 이미지
            <Asterisk className="text-red w-4 h-4" />
          </label>
          <div className="flex-1 min-w-0">
            <FileInput id="school-logo" className="w-full h-full" size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
