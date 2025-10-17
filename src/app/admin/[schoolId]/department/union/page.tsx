import Button from '@/components/button';
import { ArrowLeft, Plus } from 'lucide-react';

const UNION_DATA = [
  {
    id: '0',
    name: '김OO',
    position: '회장',
    img_url:
      'https://png.pngtree.com/background/20250201/original/pngtree-animal-welfare-love-animal-picture-image_16173398.jpg',
  },
  {
    id: '1',
    name: '김OO',
    position: '부회장',
    img_url:
      'https://png.pngtree.com/background/20250201/original/pngtree-animal-welfare-love-animal-picture-image_16173398.jpg',
  },
  {
    id: '2',
    name: '김OO',
    position: '임원',
    img_url:
      'https://png.pngtree.com/background/20250201/original/pngtree-animal-welfare-love-animal-picture-image_16173398.jpg',
  },
];

export default function DepartmentUnionPage() {
  return (
    <section className="relative flex flex-col gap-4 w-full h-full bg-white rounded-xl p-4 border border-border md:max-h-[728px] md:p-10 md:gap-6">
      <div className="relative md:absolute md:left-0 md:top-0 md:transform md:-translate-y-12 flex justify-start items-center gap-1 text-gray-900">
        <Button href={'/main/school/department'}>
          <ArrowLeft className="w-8 h-8" />
        </Button>
        <h3 className="text-20 font-semibold">학과명0</h3>
      </div>
      <div className="relative flex flex-col gap-1.5">
        <h3 className="text-18 font-semibold md:text-24 md:text-gray-900">학생회</h3>
        <div className="flex justify-start items-center gap-1">
          {/* <Image className="w-4 h-4" /> */}
          <span>{UNION_DATA.length}명의 인물</span>
        </div>
        <Button className="absolute top-0 right-0 flex items-center gap-1 text-gray-600">
          <Plus className="w-4 h-4" />
          <span className="font-medium hover:font-bold focus:font-bold active:font-bold">
            추가하기
          </span>
        </Button>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-2 md:gap-6">
        {UNION_DATA.map((person) => (
          <figure key={person.id} className="flex flex-col gap-2.5">
            {/* <img src={person.img_url} alt={person.name} className="rounded-xl" /> */}
            <figcaption className="flex flex-col gap-1">
              <h3>{person.name}</h3>
              <span>{person.position}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
