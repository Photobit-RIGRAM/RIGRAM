'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import Profile from '@/components/profile';
import { useDepartmentStore } from '@/store/useDepartmentStore';
import { useStudentStore } from '@/store/useStudentStore';
import { ArrowLeft, ListFilter, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function GraduateDepartmentStudentList() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const departmentId = segments[2];
  const [deptName, setDeptName] = useState<string | null>(null);
  const [searchable, setSearchable] = useState(false);
  const [keyword, setKeyword] = useState('');

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

  const handleListFilter = () => {};

  const handleSearch = () => {
    setSearchable(!searchable);
  };

  const filteredStudents = useMemo(() => {
    if (!keyword.trim()) return students;

    return students.filter((s) => s.name.toLowerCase().includes(keyword.toLowerCase()));
  }, [students, keyword]);

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
              <ListFilter
                className="hover:cursor-pointer hover:font-bold focus:font-bold active:font-bold"
                onClick={handleListFilter}
              />
              {searchable ? (
                <Input
                  purpose="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="이름 검색"
                />
              ) : null}
              <Search
                className="hover:cursor-pointer hover:font-bold focus:font-bold active:font-bold"
                onClick={handleSearch}
              />
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
          {isLoading ? (
            <p>불러오는 중...</p>
          ) : filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <Profile key={student.id} {...student} onClick={() => handleGoProfile(student.id)} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </section>
  );
}
