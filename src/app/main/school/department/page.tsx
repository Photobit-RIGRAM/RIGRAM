import Button from '@/components/button';
import Card from '@/components/card';
import { Plus } from 'lucide-react';

const mockData = [
  {
    id: '0',
    title: '학과명0',
    subTitle: '학과 영문명',
    imgSrc: 'https://cdn.pixabay.com/photo/2025/08/09/16/51/wildlife-9764923_1280.jpg',
    href: '#',
  },
  {
    id: '1',
    title: '학과명1',
    subTitle: '학과 영문명',
    imgSrc: 'https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_1280.jpg',
    href: '#',
  },
  {
    id: '2',
    title: '학과명2',
    subTitle: '학과 영문명',
    imgSrc: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg',
    href: '#',
  },
  {
    id: '3',
    title: '학과명3',
    subTitle: '학과 영문명',
    imgSrc: 'https://cdn.pixabay.com/photo/2021/12/14/09/37/animal-6870176_1280.jpg',
    href: '#',
  },
];

export default function DepartmentPage() {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex justify-between items-center">
        <h3>학과 리스트</h3>
        <Button className="flex items-center gap-1 px-3 py-2 text-16 text-primary-700 font-semibold">
          <Plus className="w-4 h-4" />
          학과 추가하기
        </Button>
      </header>
      <div className="grid grid-col-1 gap-6 md:grid-cols-3">
        {mockData.map((department) => (
          <div key={department.id}>
            <Card
              title={department.title}
              subTitle={department.subTitle}
              imgSrc={department.imgSrc}
              href={department.href}
            />
          </div>
        ))}
        <Card variant="add" />
      </div>
    </section>
  );
}
