import Button from '@/components/button';
import Card from '@/components/card';
import { DepartmentList } from '@/mock/mockData';
import { Plus } from 'lucide-react';

export default function DepartmentPage() {
  const schoolId = '예시schoolId';

  return (
    <section className="flex flex-col w-full gap-4 md:max-h-[700px]">
      <h1 className="sr-only">OO학교 학과 리스트</h1>
      <header className="flex justify-between items-center">
        <h2 className="text-20 font-semibold text-gray-900 md:text-24 md:font-bold">학과 리스트</h2>
        <Button
          className="flex items-center gap-1 px-3 py-2 text-16 text-primary-700 font-semibold"
          href={`/${schoolId}/department/add`}
        >
          <Plus className="w-4 h-4" />
          학과 추가하기
        </Button>
      </header>
      <div className="grid grid-col-1 gap-6 md:grid-cols-3 h-full overflow-y-scroll scrollbar-hide">
        {DepartmentList.map((dept) => (
          <div key={dept.id}>
            <Card
              title={dept.title}
              subTitle={dept.subTitle}
              imgSrc={dept.imgSrc}
              href={dept.href}
            />
          </div>
        ))}
        <Card variant="add" href={`/${schoolId}/department/add`} />
      </div>
    </section>
  );
}
