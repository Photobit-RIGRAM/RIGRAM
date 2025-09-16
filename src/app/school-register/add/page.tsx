'use client';

import Badge from '@/components/badge';
import Button from '@/components/button';
import Divider from '@/components/divider';
import FileInput from '@/components/fileInput';
import Input from '@/components/input';
import PageHeader from '@/components/pageHeader';
import { Asterisk, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function SchoolAddPage() {
  const [currentStep, setCurrentStep] = useState<'basic' | 'admin'>('basic');
  const GO_NEXT_STEP = () => setCurrentStep('admin');
  const GO_PREV_STEP = () => setCurrentStep('basic');

  const RenderStep = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <div className="bg-white w-full h-full p-5 border border-border-section rounded-xl shadow-dropdown md:w-[1080px] md:min-h-[753px] md:p-10">
            <header className="relative flex flex-col justify-start gap-2 md:gap-1">
              <ol className="flex justify-start items-center">
                <li>
                  <Badge active>기본 정보</Badge>
                </li>
                <ChevronRight className="w-4 h-4 text-gray-500" />
                <li>
                  <Badge>행정 정보</Badge>
                </li>
              </ol>
              <h3 className="text-24 text-gray-900 font-semibold">기본 정보</h3>
              <Button
                className="absolute right-0 bottom-0 text-white bg-primary-700 rounded-lg px-3 py-1.5"
                onClick={GO_NEXT_STEP}
              >
                다음
              </Button>
            </header>
            <Divider gap={6} mdGap={8} />
            <div className="flex flex-col gap-6">
              <div className="flex justify-start items-center w-full">
                <label
                  htmlFor="school-name"
                  className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
                >
                  학교 이름
                  <Asterisk className="text-red w-4 h-4" />
                </label>
                <div className="flex-1 min-w-0">
                  <Input
                    purpose="text"
                    id="school-name"
                    placeholder="학교 이름을 입력해 주세요 (80자 제한)"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex justify-start items-center w-full">
                <label
                  htmlFor="school-name-en"
                  className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
                >
                  학교 영어 이름
                </label>
                <div className="flex-1 min-w-0">
                  <Input
                    purpose="text"
                    id="school-name-en"
                    placeholder="학교 이름을 입력해 주세요 (80자 제한)"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex justify-start items-center">
                <label
                  htmlFor="school-year"
                  className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
                >
                  졸업연도
                  <Asterisk className="text-red w-4 h-4" />
                </label>
                <div className="flex-1 min-w-0">
                  <select className="w-full">
                    <option>졸업 연도를 선택해 주세요.</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-start items-center">
                <label
                  htmlFor="school-logo"
                  className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
                >
                  학교 로고
                  <Asterisk className="text-red w-4 h-4" />
                </label>
                <div className="flex-1 min-w-0">
                  <FileInput id="school-logo" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'admin':
        return (
          <div className="bg-white w-full h-full p-5 border border-border-section rounded-xl shadow-dropdown md:w-[1080px] md:min-h-[753px] md:p-10">
            <header className="relative flex flex-col justify-start gap-2 md:gap-1">
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
                  onClick={GO_PREV_STEP}
                >
                  뒤로 가기
                </Button>
                <Button className="text-white bg-primary-700 rounded-lg px-3 py-1.5">
                  추가 하기
                </Button>
              </div>
            </header>
            <Divider gap={6} mdGap={8} />
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
                  <Input
                    purpose="text"
                    id="school-admin-contact"
                    placeholder="010"
                    className="w-full"
                  />
                  <Input
                    purpose="text"
                    id="school-admin-contact"
                    placeholder="1234"
                    className="w-full"
                  />
                  <Input
                    purpose="text"
                    id="school-admin-contact"
                    placeholder="5678"
                    className="w-full"
                  />
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
          </div>
        );
    }
  };

  return (
    <section className="flex flex-col h-full gap-2 md:gap-4">
      <PageHeader title="학교 추가하기" />
      {RenderStep()}
    </section>
  );
}
