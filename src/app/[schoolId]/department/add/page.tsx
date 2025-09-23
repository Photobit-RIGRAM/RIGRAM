import Badge from '@/components/badge';
import Button from '@/components/button';
import Divider from '@/components/divider';
import FileInput from '@/components/fileInput';
import Input from '@/components/input';
import PageHeader from '@/components/pageHeader';
import Textarea from '@/components/textarea';
import { Asterisk } from 'lucide-react';

export default function DepartmentAddPage() {
  return (
    <section className="flex flex-col h-full gap-2 md:gap-4">
      <PageHeader title="학과 추가하기" />
      <div className="bg-white w-full h-full p-5 border border-border-section rounded-xl shadow-dropdown md:w-[1080px] md:min-h-[753px] md:p-10">
        <header className="relative flex flex-col justify-start gap-2 md:gap-1">
          <ol className="flex justify-start items-center">
            <li>
              <Badge active>기본 정보</Badge>
            </li>
          </ol>
          <h3 className="text-20 md:text-24 text-gray-900 font-semibold">기본 정보</h3>
          <Button className="absolute right-0 bottom-0 text-white bg-primary-700 rounded-lg px-3 py-1.5">
            추가
          </Button>
        </header>
        <Divider gap={6} mdGap={8} />
        <div className="flex flex-col gap-6">
          <div className="flex justify-start items-center w-full">
            <label
              htmlFor="colleges-name"
              className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
            >
              단과대학명
              <Asterisk className="text-red w-4 h-4" />
            </label>
            <div className="flex-1 min-w-0">
              <Input
                purpose="text"
                id="colleges-name"
                placeholder="단과대학명 이름을 입력해 주세요. (80자 제한)"
                className="w-full"
                required={true}
              />
            </div>
          </div>
          <div className="flex justify-start items-center w-full">
            <label
              htmlFor="department-name"
              className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
            >
              학과명
              <Asterisk className="text-red w-4 h-4" />
            </label>
            <div className="flex-1 min-w-0">
              <Input
                purpose="text"
                id="department-name"
                placeholder="학과 이름을 입력해 주세요. (80자 제한)"
                className="w-full"
                required={true}
              />
            </div>
          </div>
          <div className="flex justify-start items-center w-full">
            <label
              htmlFor="department-name-en"
              className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
            >
              학과 영문명
            </label>
            <div className="flex-1 min-w-0">
              <Input
                purpose="text"
                id="department-name-en"
                placeholder="학교 이름을 입력해 주세요 (80자 제한)"
                className="w-full"
              />
            </div>
          </div>
          <div className="flex justify-start items-start">
            <label
              htmlFor="department-image"
              className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
            >
              대표 이미지
              <Asterisk className="text-red w-4 h-4" />
            </label>
            <div className="flex-1 min-w-0">
              <FileInput id="department-image" className="w-full" size="lg" />
            </div>
          </div>
          <div className="flex justify-start items-start w-full">
            <label
              htmlFor="department-desc"
              className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
            >
              학과 설명
            </label>
            <div className="flex-1 min-w-0">
              <Textarea
                id="department-desc"
                placeholder="학과 설명을 입력해 주세요.(선택)"
                className="w-full p-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
