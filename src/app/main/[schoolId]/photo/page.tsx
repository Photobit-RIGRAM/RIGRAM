import Card from '@/components/card';
import { DepartmentList } from '@/mock/mockData';

export default function PhotoDepartmentListPage() {
  return (
    <section className="relative flex flex-col gap-4 w-full h-full bg-white rounded-xl p-5 md:p-6">
      <h3 className="text-20 font-semibold text-gray-900 md:text-24 md:font-bold">
        사진을 추가할 학과를 선택하세요.
      </h3>
      <div className="grid grid-col-1 gap-4 overflow-y-auto scrollbar-hide md:max-h-[700px] md:grid-cols-3 md:gap-6">
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
      </div>
    </section>
  );
}
