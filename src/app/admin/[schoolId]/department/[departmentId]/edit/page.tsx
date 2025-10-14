'use client';

import Badge from '@/components/badge';
import Button from '@/components/button';
import Divider from '@/components/divider';
import FileInput from '@/components/fileInput';
import Input from '@/components/input';
import PageHeader from '@/components/pageHeader';
import Textarea from '@/components/textarea';
import { useCollegeStore } from '@/store/useCollegeStore';
import { useDepartmentStore } from '@/store/useDepartmentStore';
import { supabase } from '@/utils/supabase/client';
import { Asterisk } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DepartmentEditPage() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const departmentId = segments[3];
  const [collegeName, setCollegeName] = useState('');
  const [deptName, setDeptName] = useState('');
  const [deptNameEn, setDeptNameEn] = useState('');
  const [imgUrl, setImgUrl] = useState<File | string | null>(null);
  const [prevImgUrl, setPrevImgUrl] = useState<string | null>(null);
  const [deptDesc, setDeptDesc] = useState('');
  const updateDepartment = useDepartmentStore((state) => state.updateDepartment);
  const fetchDepartmentById = useDepartmentStore((state) => state.fetchDepartmentById);
  const fetchCollegeById = useCollegeStore((state) => state.fetchCollegeById);

  const handleFileSelect = (file: File | null) => {
    if (!file) return;
    setImgUrl(file);
  };

  useEffect(() => {
    const getDepartment = async () => {
      if (!departmentId) return;

      const department = await fetchDepartmentById(departmentId);
      if (!department) return;

      const college = await fetchCollegeById(department.college_id);
      if (department) {
        setDeptName(department.name);
        setDeptNameEn(department.name_en);
        // setDeptDesc(department.desc ?? '');
        setImgUrl(department.img_url ?? null);
        setPrevImgUrl(department.img_url ?? null);
        setCollegeName(college ? college.name : '');
      }
    };

    getDepartment();
  }, [departmentId, fetchDepartmentById, fetchCollegeById]);

  const extractFilePathFromUrl = (url: string): string | null => {
    try {
      console.log('원본 URL:', url);

      let urlParts = url.split('/storage/v1/object/public/dept-img/');

      if (urlParts.length === 2) {
        console.log('패턴 1으로 추출된 경로:', urlParts[1]);
        return urlParts[1];
      }

      // 패턴 2: /object/public/dept-img/school/file.jpg (상대 경로)
      urlParts = url.split('/object/public/dept-img/');
      if (urlParts.length === 2) {
        console.log('패턴 2로 추출된 경로:', urlParts[1]);
        return urlParts[1];
      }

      // 패턴 3: 정규식으로 dept-img 이후 경로 추출
      const match = url.match(/dept-img\/(.+)$/);
      if (match) {
        console.log('정규식으로 추출된 경로:', match[1]);
        return match[1];
      }

      console.log('경로 추출 실패');
      return null;
    } catch (error) {
      console.error('URL 파싱 오류:', error);
      return null;
    }
  };

  const handleDeptUpdate = async () => {
    if (!deptName || !deptNameEn) {
      alert('필수 입력값이 누락되었습니다.');
      return;
    }

    try {
      let logoUrl: string | null = null;

      if (imgUrl instanceof File) {
        // const schoolName = segments[0];
        const fileName = imgUrl.name;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('dept-img')
          .upload(filePath, imgUrl, { upsert: true });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          alert('이미지 업로드 실패');
          return;
        }

        const { data: urlData } = supabase.storage.from('dept-img').getPublicUrl(filePath);
        logoUrl = urlData.publicUrl;

        // 기존 이미지가 잇을 경우 storage에서 삭제
        if (prevImgUrl && prevImgUrl !== logoUrl) {
          // if (prevImgUrl && prevImgUrl.includes(`/object/public/dept-img/`)) {
          // const parts = prevImgUrl.split(`/object/public/dept-img`);
          // let oldFilePath = parts.length > 1 ? parts[1] : null;
          const oldFilePath = extractFilePathFromUrl(prevImgUrl);

          // if (oldFilePath?.startsWith('/')) {
          //   oldFilePath = oldFilePath.slice(1);
          // }
          console.log('삭제할 oldFilePath:', oldFilePath);

          if (oldFilePath) {
            console.log('삭제할 oldFilePath:', oldFilePath);
            const { error: removeError } = await supabase.storage
              .from('dept-img')
              .remove([oldFilePath]);

            if (removeError) {
              console.error('기존 이미지 삭제 실패:', removeError);
            } else {
              console.log('기존 이미지 삭제 성공:', oldFilePath);
            }
          }
        }
      } else if (typeof imgUrl === 'string') {
        logoUrl = imgUrl;
      }

      // 학과 업데이트
      const updated = await updateDepartment(departmentId, {
        name: deptName,
        name_en: deptNameEn,
        // desc: deptDesc,
        img_url: logoUrl,
      });

      if (!updated) {
        alert('학과 수정 실패');
        return;
      }

      setPrevImgUrl(logoUrl);
      alert('학과가 성공적으로 수정되었습니다!');
    } catch (error) {
      console.error('Unexpected error:', error);
      alert(`예상치 못한 오류: ${error}`);
    }
  };

  return (
    <section className="flex flex-col h-full gap-2 md:gap-4">
      <PageHeader title="학과 수정하기" />
      <div className="bg-white w-full h-full p-5 border border-border-section rounded-xl shadow-dropdown md:w-[1080px] md:min-h-[753px] md:p-10">
        <header className="relative flex flex-col justify-start gap-2 md:gap-1">
          <ol className="flex justify-start items-center">
            <li>
              <Badge active>기본 정보</Badge>
            </li>
          </ol>
          <h3 className="text-20 md:text-24 text-gray-900 font-semibold">기본 정보</h3>
          <Button
            className="absolute right-0 bottom-0 text-white bg-primary-700 rounded-lg px-3 py-1.5"
            onClick={handleDeptUpdate}
          >
            수정
          </Button>
        </header>
        <Divider gap={6} mdGap={8} />
        <div className="flex flex-col gap-6">
          <div className="flex justify-start items-center w-full">
            <label
              htmlFor="colleges-name"
              className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
            >
              단과대학명
              <Asterisk className="text-red w-4 h-4" />
            </label>
            <div className="flex-1 min-w-0">
              <Input
                purpose="text"
                id="colleges-name"
                placeholder="단과대학명 이름을 입력해 주세요. (80자 제한)"
                className="w-full"
                required={true}
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-start items-center w-full">
            <label
              htmlFor="department-name"
              className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
            >
              학과명
              <Asterisk className="text-red w-4 h-4" />
            </label>
            <div className="flex-1 min-w-0">
              <Input
                purpose="text"
                id="department-name"
                placeholder="학과 이름을 입력해 주세요. (80자 제한)"
                className="w-full"
                required={true}
                value={deptName}
                onChange={(e) => setDeptName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-start items-center w-full">
            <label
              htmlFor="department-name-en"
              className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
            >
              학과 영문명
            </label>
            <div className="flex-1 min-w-0">
              <Input
                purpose="text"
                id="department-name-en"
                placeholder="학교 이름을 입력해 주세요 (80자 제한)"
                className="w-full"
                value={deptNameEn}
                onChange={(e) => setDeptNameEn(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-start items-start">
            <label
              htmlFor="department-image"
              className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
            >
              대표 이미지
              <Asterisk className="text-red w-4 h-4" />
            </label>
            <div className="flex-1 min-w-0">
              <FileInput
                id="department-image"
                className="w-full"
                size="lg"
                onChange={(files) => {
                  if (!files) return;
                  const file = files instanceof FileList ? files[0] : files;
                  handleFileSelect(file);
                }}
              />
            </div>
          </div>
          <div className="flex justify-start items-start w-full">
            <label
              htmlFor="department-desc"
              className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
            >
              학과 설명
            </label>
            <div className="flex-1 min-w-0">
              <Textarea
                id="department-desc"
                placeholder="학과 설명을 입력해 주세요.(선택)"
                className="w-full p-4"
                value={deptDesc}
                onChange={(e) => setDeptDesc(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
