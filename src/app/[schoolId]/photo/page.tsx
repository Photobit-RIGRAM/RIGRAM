'use client';

import Card from '@/components/card';
import { useCollegeStore } from '@/store/useCollegeStore';
import { useDepartmentStore } from '@/store/useDepartmentStore';
import { useSchoolStore } from '@/store/useSchoolStore';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function PhotoDepartmentListPage() {
  const pathname = usePathname();
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
    <section className="relative flex flex-col gap-4 w-full h-full bg-white rounded-xl p-5 md:p-6">
      <h3 className="text-20 font-semibold text-gray-900 md:text-24 md:font-bold">
        사진을 추가할 학과를 선택하세요.
      </h3>
      <div className="grid grid-col-1 gap-4 overflow-y-auto scrollbar-hide md:max-h-[700px] md:grid-cols-3 md:gap-6">
        {departments.map((dept) => (
          <Card
            key={dept.id}
            title={dept.name}
            subTitle={dept.name_en}
            imgSrc={dept.img_url || undefined}
            href={`${pathname}/${dept.id}`}
          />
        ))}
      </div>
    </section>
  );
}
