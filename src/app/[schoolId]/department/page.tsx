'use client';

import Button from '@/components/button';
import Card from '@/components/card';
import { useCollegeStore } from '@/store/useCollegeStore';
import { useDepartmentStore } from '@/store/useDepartmentStore';
import { useSchoolStore } from '@/store/useSchoolStore';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';

export default function DepartmentPage() {
  const school = useSchoolStore((state) => state.school);
  const colleges = useCollegeStore((state) => state.colleges);
  const fetchColleges = useCollegeStore((state) => state.fetchColleges);
  const departments = useDepartmentStore((state) => state.departments);
  const fetchDepartments = useDepartmentStore((state) => state.fetchDepartments);
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-');
  const schoolId = slugify(school?.school_en_name ?? '');
  const school_id = school?.id;

  useEffect(() => {
    if (!school_id) return;
    fetchColleges(school_id);
  }, [school_id, fetchColleges]);

  useEffect(() => {
    colleges.forEach((college) => {
      fetchDepartments(college.id);
    });
  }, [colleges, fetchDepartments]);

  return (
    <section className="flex flex-col w-full gap-4 md:max-h-[700px]">
      <h1 className="sr-only">{`${school?.school_name} 학교 학과 리스트`}</h1>
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
        {departments
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name, 'ko'))
          .map((dept) => (
            <Card
              key={dept.id}
              title={dept.name}
              subTitle={dept.name_en}
              imgSrc={dept.img_url || undefined}
              href={`/${schoolId}/department/${dept.id}`}
            />
          ))}
        <Card variant="add" href={`/${schoolId}/department/add`} />
      </div>
    </section>
  );
}
