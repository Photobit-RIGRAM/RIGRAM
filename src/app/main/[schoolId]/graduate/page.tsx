import Card from '@/components/card';
import { DepartmentList } from '@/mock/mockData';

export default function GraduatePage() {
  return (
    <section className="flex flex-col gap-4 w-full h-full bg-white rounded-xl p-5 md:p-6">
      <h3 className="text-20 font-semibold md:text-24 md:font-bold">
        추가할 졸업생의 학과를 선택하세요.
      </h3>
      <div className="grid grid-col-1 gap-4 flex-1 h-full overflow-y-auto scrollbar-hide md:grid-cols-3 md:gap-6 md:max-h-[700px]">
        {DepartmentList.map((dept) => (
          <Card
            key={dept.id}
            title={dept.title}
            subTitle={dept.subTitle}
            href={dept.href}
            imgSrc={dept.imgSrc}
          />
        ))}
      </div>
    </section>
  );
}
