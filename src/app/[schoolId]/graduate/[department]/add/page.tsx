'use client';

import Badge from '@/components/badge';
import Button from '@/components/button';
import FileInput from '@/components/fileInput';
import Input from '@/components/input';
import { useDepartmentStore } from '@/store/useDepartmentStore';
import { useSchoolStore } from '@/store/useSchoolStore';
import { useStudentStore } from '@/store/useStudentStore';
import { supabase } from '@/utils/supabase/client';
import { ArrowLeft, Asterisk } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GraduateAddPage() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const currentSchoolId = segments[0];
  const currentDeptId = segments[2];
  const [studentName, setStudentName] = useState('');
  const [studentNameEn, setStudentNameEn] = useState('');
  const [deptName, setDeptName] = useState('');
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [graduationImg, setGraduationImg] = useState<File | null>(null);
  const fetchDepartmentById = useDepartmentStore((state) => state.fetchDepartmentById);
  const addStudentProfile = useStudentStore((state) => state.addStudentProfile);
  const school = useSchoolStore((state) => state.school);
  const schoolNameEn = school?.school_en_name || '';
  const [deptNameEn, setDeptNameEn] = useState('');

  useEffect(() => {
    if (currentDeptId) {
      fetchDepartmentById(currentDeptId).then((dept) => {
        if (dept?.name) {
          setDeptName(dept.name);
          setDeptNameEn(dept.name_en);
        }
      });
    }
  }, [currentDeptId, fetchDepartmentById]);

  const handleGoBack = () => {
    router.back();
  };
  const handleFileSelect = (file: File | null, type: 'profile' | 'graduation') => {
    if (!file) return;
    if (type === 'profile') {
      setProfileImg(file);
    } else {
      setGraduationImg(file);
    }
  };

  const uploadImage = async (file: File, folder: string) => {
    const filePath = `${schoolNameEn}/${deptNameEn}/${studentNameEn}/${folder}/${file.name}`;
    const { data, error } = await supabase.storage.from('student-profiles').upload(filePath, file);

    if (!data) {
      console.log(data);
    }

    if (error) {
      console.error('이미지 업로드 실패:', error.message);
      return null;
    }

    const { data: urlData } = supabase.storage.from('student-profiles').getPublicUrl(filePath);

    return urlData?.publicUrl ?? null;
  };

  const handleProfileAdd = async () => {
    if (!studentName || !studentNameEn) return;

    try {
      let profileUrl: string | null = null;
      let graduationUrl: string | null = null;

      if (profileImg) {
        profileUrl = await uploadImage(profileImg, 'profile');
      }
      if (graduationImg) {
        graduationUrl = await uploadImage(graduationImg, 'graduation');
      }

      await addStudentProfile(
        currentSchoolId,
        currentDeptId,
        studentName,
        studentNameEn,
        profileUrl,
        graduationUrl
      );

      alert('학생 프로필이 추가되었습니다.');
      router.back();
    } catch (error) {
      console.error('Unexpected error : ', error);
      alert('학생 프로필 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <section className="relative bg-white w-full p-4 md:p-10 border border-gray-200 rounded-xl shadow-dropdown md:w-[1080px] md:min-h-[753px]">
      <div className="z-10 absolute left-0 top-0 transform -translate-y-12 flex justify-start items-center gap-1 text-gray-900">
        <Button onClick={handleGoBack}>
          <ArrowLeft className="w-8 h-8" />
        </Button>
        <h3 className="text-20 font-semibold">졸업생 추가하기</h3>
      </div>
      <header className="relative flex flex-col justify-start gap-1">
        <ol className="flex justify-start items-center">
          <li>
            <Badge active>졸업생 정보</Badge>
          </li>
        </ol>
        <h3 className="text-24 text-gray-900 font-semibold">졸업생 정보</h3>
        <div className="absolute right-0 bottom-0 flex items-center gap-2">
          <Button
            className="text-white bg-primary-700 rounded-lg px-3 py-1.5"
            onClick={handleProfileAdd}
          >
            추가하기
          </Button>
        </div>
      </header>
      <span className="inline-block w-full h-px bg-gray-200 my-8" aria-hidden="true"></span>
      <div className="flex flex-col gap-6">
        <div className="flex justify-start items-center w-full">
          <label
            htmlFor="graduate-name"
            className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
          >
            이름
            <Asterisk className="text-red w-4 h-4" />
          </label>
          <div className="flex-1 min-w-0">
            <Input
              purpose="text"
              id="graduate-name"
              placeholder="졸업생의 이름을 입력해 주세요.(80자 제한)"
              className="w-full"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-start items-center w-full">
          <label
            htmlFor="graduate-en-name"
            className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
          >
            영어 이름
            <Asterisk className="text-red w-4 h-4" />
          </label>
          <div className="flex-1 min-w-0">
            <Input
              purpose="text"
              id="graduate-en-name"
              placeholder="졸업생의 영어 이름을 입력해 주세요.(80자 제한)"
              className="w-full"
              value={studentNameEn}
              onChange={(e) => setStudentNameEn(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-start items-center w-full">
          <label
            htmlFor="department-name"
            className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
          >
            학과
          </label>
          <div className="flex-1 min-w-0">
            <Input
              purpose="text"
              id="department-name"
              placeholder="학과 이름을 입력해 주세요.(80자 제한)"
              className="w-full"
              value={deptName}
            />
          </div>
        </div>
        <div className="flex justify-start items-start">
          <label
            htmlFor="profile-img"
            className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
          >
            프로필 이미지
            <Asterisk className="text-red w-4 h-4" />
          </label>
          <div className="flex-1 min-w-0">
            <FileInput
              id="profile-img"
              className="w-full h-full"
              size="lg"
              onChange={(files) => {
                if (!files) return;
                const file = files instanceof FileList ? files[0] : files;
                handleFileSelect(file, 'profile');
              }}
            />
          </div>
        </div>
        <div className="flex justify-start items-start">
          <label
            htmlFor="graduation-img"
            className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
          >
            학사모 이미지
            <Asterisk className="text-red w-4 h-4" />
          </label>
          <div className="flex-1 min-w-0">
            <FileInput
              id="graduation-img"
              className="w-full h-full"
              size="lg"
              onChange={(files) => {
                if (!files) return;
                const file = files instanceof FileList ? files[0] : files;
                handleFileSelect(file, 'graduation');
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
