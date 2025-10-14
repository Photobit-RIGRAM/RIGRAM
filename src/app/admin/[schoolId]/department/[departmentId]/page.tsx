'use client';

import Button from '@/components/button';
import PageHeader from '@/components/pageHeader';
import { useCollegeStore } from '@/store/useCollegeStore';
import { useDepartmentStore } from '@/store/useDepartmentStore';
import { Calendar, GraduationCap, PencilLine, Tag, Trash } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DepartmentDetail() {
  const router = useRouter();
  const [collegeName, setCollegeName] = useState<string | null>(null);
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const schoolId = segments[1];
  const departmentId = segments[3];
  const { departments, fetchDepartmentById, deleteDepartment, isLoading } = useDepartmentStore();
  const { fetchCollegeById } = useCollegeStore();

  useEffect(() => {
    if (departmentId) {
      fetchDepartmentById(departmentId).then((dept) => {
        if (dept?.college_id) {
          fetchCollegeById(dept.college_id).then((college) => {
            if (college) setCollegeName(college.name);
          });
        }
      });
    }
  }, [departmentId, fetchDepartmentById, fetchCollegeById]);

  const department = departments.find((d) => d.id === departmentId);

  if (!department || isLoading) return <p>학과 데이터를 불러오는 중 입니다.</p>;

  const handleDelete = async () => {
    if (confirm(`${department.name}을 삭제하시겠습니까?`)) {
      const success = await deleteDepartment(departmentId);
      if (success) {
        alert(`${department.name}가 삭제되었습니다.`);
        router.replace(`/admin/${schoolId}/department`);
      }
    }
  };

  const DETAIL_DATA = [
    {
      id: '0',
      icon: <GraduationCap />,
      title: '학과명',
      content: `${department.name}`,
    },
    {
      id: '1',
      icon: <GraduationCap />,
      title: '영어 학과명',
      content: `${department.name_en}`,
    },
    {
      id: '2',
      icon: <Tag />,
      title: '단과대학',
      content: `${collegeName}`,
    },
    {
      id: '3',
      icon: <Calendar />,
      title: '생성일',
      content: `${department.created_at.slice(0, 10)}`,
    },
    {
      id: '4',
      icon: <Calendar />,
      title: '수정일',
      content: `${department.updated_at.slice(0, 10)}`,
    },
  ];

  return (
    <>
      <PageHeader title={department.name} />
      <section className="relative w-full bg-white rounded-xl p-4 border border-border md:max-h-[728px] md:p-10">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-20 text-gray-900 font-semibold">기본 정보</h2>
          <div className="flex flex-row gap-2">
            <Button
              className="flex items-center gap-1 text-gray-600"
              href={`/admin/${schoolId}/department/${departmentId}/edit`}
            >
              <PencilLine className="w-4 h-4" />
              <span>학과 수정하기</span>
            </Button>
            <Button className="flex items-center gap-1 text-red" onClick={handleDelete}>
              <Trash className="w-4 h-4" />
              <span>학과 삭제하기</span>
            </Button>
          </div>
        </header>
        {department.img_url && (
          <div className="mb-6 md:mb-15">
            <div className="relative w-full h-[200px] md:h-[280px] rounded-xl">
              <Image
                src={department.img_url}
                alt={`${department.name} 대표 이미지`}
                fill
                sizes="(max-width: 768px) 100% 200px, 100%, 280px"
                className="object-cover"
              />
            </div>
          </div>
        )}
        <dl className="flex flex-col gap-5">
          {DETAIL_DATA.map((info) => (
            <div className="flex justify-start items-center gap-2" key={info.id}>
              <dt className="flex justify-start items-center gap-2 w-30 text-gray-600 shrink-0 md:w-40">
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
