'use client';

import Button from '@/components/button';
import { useDepartmentStore } from '@/store/useDepartmentStore';
import { useSchoolStore } from '@/store/useSchoolStore';
import { useStudentStore } from '@/store/useStudentStore';
import { supabase } from '@/utils/supabase/client';
import { ArrowLeft, Calendar, Dot, Mail, PencilLine, Phone, Trash, User } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function GraduateDepartmentPage() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const deptId = segments[3];
  const studentId = segments[4];
  const { student, fetchStudentById, isLoading, error, deleteStudentProfile } = useStudentStore();
  const fetchDepartmentById = useDepartmentStore((state) => state.fetchDepartmentById);
  const departments = useDepartmentStore((state) => state.departments);
  const school = useSchoolStore((state) => state.school);

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    if (studentId) {
      fetchStudentById(studentId);
      fetchDepartmentById(deptId);
    }
  }, [deptId, fetchDepartmentById, fetchStudentById, studentId]);

  const department = departments.find((d) => d.id === deptId);

  const deleteStudentFromStorage = async (
    schoolNameEn: string,
    deptNameEn: string,
    studentNameEn: string
  ) => {
    const folderPath = `${schoolNameEn}/${deptNameEn}/${studentNameEn}`;
    const subfolders = ['profile', 'graduation'];

    // 하위 폴더부터 삭제
    for (const sub of subfolders) {
      const { data: subFiles, error: subError } = await supabase.storage
        .from('student-profiles')
        .list(`${folderPath}/${sub}`);
      if (subError) {
        console.error(`${sub} 폴더 조회 실패:`, subError.message);
        continue;
      }

      if (subFiles && subFiles.length > 0) {
        const paths = subFiles.map((sf) => `${folderPath}/${sub}/${sf.name}`);
        const { error: removeError } = await supabase.storage
          .from('student-profiles')
          .remove(paths);
        if (removeError) {
          console.error(`${sub} 폴더 파일 삭제 실패:`, removeError.message);
        } else {
          console.log(`${sub} 폴더 내 파일 삭제 완료`);
        }
      }
    }

    // 상위 폴더의 루트에 파일이 있을 경우 삭제
    const { data, error } = await supabase.storage
      .from('student-profiles')
      .list(folderPath, { limit: 100 });

    if (error) {
      console.error('상위 폴더 조회 실패:', error.message);
      return;
    }

    if (data && data.length > 0) {
      const filePaths = data.map((f) => `${folderPath}/${f.name}`);
      const { error: removeError } = await supabase.storage
        .from('student-profiles')
        .remove(filePaths);
      if (removeError) {
        console.error('상위 폴더 파일 삭제 실패:', removeError.message);
      } else {
        console.log('상위 폴더 파일 삭제 완료:', folderPath);
      }
    }

    console.log(`${studentNameEn} 학생 폴더 삭제 완료`);
  };

  const handleGraduateDelete = async () => {
    if (confirm(`${student?.name} 졸업생의 정보를 삭제하시겠습니까? `)) {
      await deleteStudentFromStorage(
        school?.school_name_en || '',
        department?.name_en || '',
        student?.name_en || ''
      );

      const success = await deleteStudentProfile(studentId);
      if (success) {
        alert(`${student?.name} 졸업생의 정보가 삭제되었습니다.`);
        router.replace(`${pathname.slice(0, pathname.lastIndexOf('/'))}`);
      }
    }
  };

  // 에러 발생했을 때
  if (error) {
    return <div className="p-10 text-center text-red-500">에러: {error}</div>;
  }

  // student 데이터가 아직 없을 때
  if (!student || isLoading) {
    return <div className="p-10 text-center">학생 데이터를 찾는 중 입니다.</div>;
  }

  return (
    <section className="relative w-full h-full border border-border rounded-xl shadow-dropdown overflow-hidden">
      <div className="z-10 px-5 pt-5 relative mb-4 md:absolute md:left-0 md:top-0 md:transform md:-translate-y-12 flex justify-start items-center gap-1 text-gray-900 md:px-0 md:pt-0">
        <Button onClick={handleGoBack}>
          <ArrowLeft className="w-8 h-8" />
        </Button>
        <h3 className="text-20 font-semibold">졸업생 상세 정보</h3>
      </div>
      <div className="absolute top-0 right-0 left-0 h-40 z-0">
        <div className="relative w-full h-full">
          <Image
            src={department?.img_url ?? ''}
            alt={`${department?.name} 학과대표이미지`}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="relative flex flex-col gap-10 justify-start items-start w-full h-full pt-10 px-5 md:px-10 md:pt-35">
        <div className="relative flex flex-col justify-center items-center gap-2 w-full md:gap-4 md:justify-start md:items-end md:flex-row">
          <div className="flex justify-start items-center gap-1">
            <div className="w-30 h-30 bg-white p-1 rounded-4xl overflow-hidden">
              <div className="relative w-full h-full rounded-4xl">
                <Image src={student.profile_default} alt="증명사진" fill className="object-cover" />
              </div>
            </div>
            <div className="w-30 h-30 bg-white p-1 rounded-4xl overflow-hidden">
              <div className="relative w-full h-full rounded-4xl">
                <Image
                  src={student.profile_graduate}
                  alt="증명사진"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 items-center md:items-start">
            <h3 className="text-18 md:text-22 text-gray-900 font-semibold">{student.name}</h3>
            <div className="flex items-center gap-2 text-16 text-gray-600 font-medium">
              <span>{department?.name}</span>
              <Dot />
              <span>{student.name_en}</span>
            </div>
          </div>
          <div className="relative md:absolute md:top-8 md:right-0 md:flex md:gap-2">
            <Button className="flex items-center gap-1 text-gray-600" href={`${pathname}/edit`}>
              <PencilLine className="w-4 h-4" />
              <span>졸업생 수정하기</span>
            </Button>
            <Button className="flex items-center gap-1 text-red" onClick={handleGraduateDelete}>
              <Trash className="w-4 h-4" />
              <span>졸업생 삭제하기</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h3 className="text-18 text-gray-900 font-semibold">상세 정보</h3>
          <dl className="flex flex-col gap-5">
            <div className="flex justify-start items-center gap-2 text-18 font-medium">
              <dt className="flex items-center gap-2 text-gray-600 w-26 md:w-36">
                <User />
                <span>담당자</span>
              </dt>
              {/* <dd className="text-gray-900">{StudentData.name}</dd> */}
            </div>
            <div className="flex justify-start items-center gap-2 text-18 font-medium">
              <dt className="flex items-center gap-2 text-gray-600 w-26 md:w-36">
                <Mail />
                <span>이메일</span>
              </dt>
              {/* <dd className="text-gray-900">{StudentData.email}</dd> */}
            </div>
            <div className="flex justify-start items-center gap-2 text-18 font-medium">
              <dt className="flex items-center gap-2 text-gray-600 w-26 md:w-36">
                <Phone />
                <span>전화번호</span>
              </dt>
              {/* <dd className="text-gray-900">{StudentData.phone}</dd> */}
            </div>
            <div className="flex justify-start items-center gap-2 text-18 font-medium">
              <dt className="flex items-center gap-2 text-gray-600 w-26 md:w-36">
                <Calendar />
                <span>생성일</span>
              </dt>
              <dd className="text-gray-900">{student.created_at.slice(0, 10)}</dd>
            </div>
            <div className="flex justify-start items-center gap-2 text-18 font-medium">
              <dt className="flex items-center gap-2 text-gray-600 w-26 md:w-36">
                <Calendar />
                <span>수정일</span>
              </dt>
              <dd className="text-gray-900">{student.updated_at.slice(0, 10)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
