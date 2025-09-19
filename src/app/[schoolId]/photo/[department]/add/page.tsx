import Badge from '@/components/badge';
import Button from '@/components/button';
import FileInput from '@/components/fileInput';
import Input from '@/components/input';
import { ArrowLeft, Asterisk } from 'lucide-react';

export default function PhotoAddPage() {
  const CATEGORY_OPTIONS = [
    { value: 'team', label: '팀' },
    { value: 'group', label: '단체' },
    { value: 'club', label: '동아리' },
    { value: 'event', label: '행사' },
  ];

  return (
    <section className="relative bg-white w-full p-4 md:p-10 border border-gray-200 rounded-xl shadow-dropdown md:w-[1080px] md:min-h-[753px]">
      {/* <div className="absolute left-0 top-0 transform -translate-y-12 flex justify-start items-center gap-1 text-gray-900">
        <Button href={'/main'}>
          <ArrowLeft className="w-8 h-8" />
        </Button>
        <h3 className="text-20 font-semibold">사진 / 동영상 추가하기</h3>
      </div> */}
      <header className="relative flex flex-col justify-start gap-1">
        <ol className="flex justify-start items-center">
          <li>
            <Badge active>사진 / 동영상 추가</Badge>
          </li>
        </ol>
        <h3 className="text-24 text-gray-900 font-semibold">사진 / 동영상 추가</h3>
        <div className="absolute right-0 bottom-0 flex items-center gap-2">
          <Button className="text-white bg-primary-700 rounded-lg px-3 py-1.5">추가하기</Button>
        </div>
      </header>
      <span className="inline-block w-full h-px bg-gray-200 my-8" aria-hidden="true"></span>
      <form className="flex flex-col gap-6">
        <div className="flex justify-start items-center w-full">
          <label
            htmlFor="graduate-en-name"
            className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
          >
            제목
            <Asterisk className="text-red w-4 h-4" />
          </label>
          <Input
            purpose="text"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
            className="w-full"
          />
        </div>
        <div className="flex justify-start items-center w-full">
          <label
            htmlFor="school-year"
            className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
          >
            카테고리
            <Asterisk className="text-red w-4 h-4" />
          </label>
          <div className="flex-1 min-w-0">
            <select
              // value={category}
              // onChange={(e) => setCategory(e.target.value)}
              className="w-full"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-start items-start">
          <label
            htmlFor="photo-upload"
            className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
          >
            사진/동영상 업로드
            <Asterisk className="text-red w-4 h-4" />
          </label>
          <div className="flex-1 min-w-0">
            <FileInput id="photo-upload" size="lg" multiple />
          </div>
        </div>
      </form>
    </section>
  );
}
