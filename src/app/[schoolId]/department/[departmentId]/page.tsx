import Button from '@/components/button';
import PageHeader from '@/components/pageHeader';
import { ArrowLeft, Calendar, GraduationCap, PencilLine, Tag } from 'lucide-react';

const DETAIL_DATA = [
  {
    id: '0',
    icon: <GraduationCap />,
    title: '학과명',
    content: '학과명0',
  },
  {
    id: '1',
    icon: <GraduationCap />,
    title: '영어 학과명',
    content: 'Department Name0',
  },
  {
    id: '2',
    icon: <Tag />,
    title: '단과대학',
    content: '인문계열',
  },
  {
    id: '3',
    icon: <Calendar />,
    title: '생성일',
    content: '2022-01-01',
  },
  {
    id: '4',
    icon: <Calendar />,
    title: '수정일',
    content: '2025-01-01',
  },
];

export default function DepartmentDetail() {
  return (
    <>
      <PageHeader title="국어국문학과" />
      <section className="relative w-full bg-white rounded-xl p-4 border border-border md:max-h-[728px] md:p-10">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-20 text-gray-900 font-semibold">기본 정보</h2>
          <Button className="flex items-center gap-1 text-gray-600">
            <PencilLine className="w-4 h-4" />
            <span>정보 수정하기</span>
          </Button>
        </header>
        <div className="mb-6 md:mb-15">
          <img
            src="https://cdn.pixabay.com/photo/2025/08/09/16/51/wildlife-9764923_1280.jpg"
            alt="학과명0 대표이미지"
            className="w-full h-[200px] md:h-[280px] object-cover rounded-xl"
          />
        </div>
        <dl className="flex flex-col gap-5">
          {DETAIL_DATA.map((info) => (
            <div className="flex justify-start items-center gap-2" key={info.id}>
              <dt className="flex justify-start items-center gap-2 w-25 text-gray-600 md:w-40">
                {info.icon}
                <span className="text-16 md:text-18 flex-1 whitespace-nowrap">{info.title}</span>
              </dt>
              <dd className="text-16 md:text-18 text-gray-900 overflow-ellipsis">{info.content}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
