'use client';

import Button from '@/components/button';
import Profile from '@/components/profile';
import { useCollegeStore } from '@/store/useCollegeStore';
import { useDepartmentStore } from '@/store/useDepartmentStore';
import { useStudentStore } from '@/store/useStudentStore';
import { ArrowLeft, ListFilter, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GraduateDepartmentStudentList() {
  const router = useRouter();
  const [deptName, setDeptName] = useState<string | null>(null);
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const departmentId = segments[2];
  const fetchCollegeById = useCollegeStore((state) => state.fetchCollegeById);
  const fetchDepartmentById = useDepartmentStore((state) => state.fetchDepartmentById);
  const { students, fetchStudents, isLoading } = useStudentStore();

  useEffect(() => {
    if (departmentId) {
      fetchDepartmentById(departmentId).then((dept) => {
        setDeptName(dept?.name || null);
      });
    }
  }, [departmentId, fetchDepartmentById]);

  useEffect(() => {
    if (departmentId) {
      fetchStudents(departmentId);
    }
  }, [departmentId, fetchStudents]);

  const handleGoBack = () => {
    router.back();
  };
  const handleGoProfile = (id: string) => {
    router.push(`${pathname}/${id}`);
  };

  return (
    <section className="relative w-full h-full bg-white border border-border p-5 rounded-xl shadow-dropdown md:p-10">
      <div className="z-10 relative mb-4 md:absolute md:left-0 md:top-0 md:transform md:-translate-y-12 flex justify-start items-center gap-1 text-gray-900 md:px-0 md:pt-0">
        <Button onClick={handleGoBack}>
          <ArrowLeft className="w-8 h-8" />
        </Button>
        <h2 className="text-20 font-semibold">{deptName}</h2>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h3 className="text-18 md:text-20 font-semibold">졸업생 리스트</h3>
          <div className="flex items-center gap-2 md:gap-6">
            <div className="flex items-center gap-2 text-gray-600 md:gap-4">
              <ListFilter className="hover:cursor-pointer hover:font-bold focus:font-bold active:font-bold" />
              <Search className="hover:cursor-pointer hover:font-bold focus:font-bold active:font-bold" />
            </div>
            <Button
              className="text-white bg-primary-700 text-16 rounded-lg px-3 py-2 hover:font-bold focus:font-bold active:font-bold"
              href={`${pathname}/add`}
            >
              졸업생 추가하기
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-4">
          {students.map((student) => (
            <Profile key={student.id} {...student} onClick={() => handleGoProfile(student.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}
