import Badge from '@/components/badge';
import Button from '@/components/button';
import FileInput from '@/components/fileInput';
import Input from '@/components/input';
import { ArrowLeft, Asterisk, ChevronRight } from 'lucide-react';

export default function SchoolAddBasicPage() {
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
            <Badge active>기본 정보</Badge>
          </li>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          <li>
            <Badge>행정 정보</Badge>
          </li>
        </ol>
        <h3 className="text-24 text-gray-900 font-semibold">기본 정보</h3>
        <Button className="absolute right-0 bottom-0 text-white bg-primary-700 rounded-lg px-3 py-1.5">
          다음
        </Button>
      </header>
      <span className="inline-block w-full h-px bg-gray-200 my-8" aria-hidden="true"></span>
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
    </section>
  );
}
