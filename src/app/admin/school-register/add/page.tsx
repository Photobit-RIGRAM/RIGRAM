'use client';

import Badge from '@/components/badge';
import Button from '@/components/button';
import Divider from '@/components/divider';
import FileInput from '@/components/fileInput';
import Input from '@/components/input';
import PageHeader from '@/components/pageHeader';
import Select from '@/components/select';
import { useSchoolStore } from '@/store/useSchoolStore';
import { supabase } from '@/utils/supabase/client';
import { Asterisk, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SchoolAddPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<'basic' | 'admin'>('basic');
  const [schoolName, setSchoolName] = useState('');
  const [schoolNameEn, setSchoolNameEn] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [schoolLogo, setSchoolLogo] = useState<File | string | null>('');
  const [adminName, setAdminName] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const addSchool = useSchoolStore((state) => state.addSchool);

  const GO_NEXT_STEP = () => setCurrentStep('admin');
  const GO_PREV_STEP = () => setCurrentStep('basic');

  const handleFileSelect = (file: File | null) => {
    if (!file) return;
    setSchoolLogo(file); // state에 File객체 저장
  };

  const handleSchoolRegister = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('로그인이 필요합니다.');

      // 🔍 중복 체크
      const { data: existingSchool } = await supabase
        .from('schools')
        .select('id')
        .eq('manager_contact', adminPhone)
        .single();
      if (existingSchool) {
        alert('이미 등록된 담당자 전화번호입니다.');
        return;
      }

      let logoUrl: string | null = null;

      // schoolLogo가 File 타입이면 업로드 실행
      if (schoolLogo instanceof File) {
        const filePath = `${schoolNameEn}/school-logo`;

        const { error: uploadError } = await supabase.storage
          .from('school-logos')
          .upload(filePath, schoolLogo, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('school-logos').getPublicUrl(filePath);
        logoUrl = urlData.publicUrl;
      } else if (typeof schoolLogo === 'string') {
        // 이미 URL이 있는 경우 (예: 수정 시)
        logoUrl = schoolLogo;
      }

      await addSchool(
        {
          school_name: schoolName,
          school_name_en: schoolNameEn,
          graduation_year: graduationYear,
          school_img_url: logoUrl,
          manager_name: adminName,
          manager_contact: adminPhone,
          manager_email: adminEmail,
        },
        user.id
      );

      alert('학교 추가를 했습니다. 메인 페이지로 이동합니다.');
      router.replace(`/admin/${user.id}`);

      setSchoolName('');
      setSchoolNameEn('');
      setGraduationYear('');
      setSchoolLogo('');
      setAdminName('');
      setAdminPhone('');
      setAdminEmail('');
    } catch (error) {
      console.error(error);
      alert('학교 추가에 실패했습니다.');
    }
  };

  const RenderStep = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <div className="bg-white w-full h-full p-5 border border-border-section rounded-xl shadow-dropdown md:w-[1080px] md:min-h-[753px] md:p-10">
            <header className="relative flex flex-col justify-start gap-2 md:gap-1">
              <ol className="flex justify-start items-center">
                <li>
                  <Badge active>기본 정보</Badge>
                </li>
                <ChevronRight className="w-4 h-4 text-gray-500" />
                <li>
                  <Badge>행정 정보</Badge>
                </li>
              </ol>
              <h3 className="text-24 text-gray-900 font-semibold">기본 정보</h3>
              <Button
                className="absolute right-0 bottom-0 text-white bg-primary-700 rounded-lg px-3 py-1.5"
                onClick={GO_NEXT_STEP}
              >
                다음
              </Button>
            </header>
            <Divider gap={6} mdGap={8} />
            <div className="flex flex-col gap-6">
              <div className="flex justify-start items-center w-full">
                <label
                  htmlFor="schoolName"
                  className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
                >
                  학교 이름
                  <Asterisk className="text-red w-4 h-4" />
                </label>
                <div className="flex-1 min-w-0">
                  <Input
                    purpose="text"
                    id="schoolName"
                    placeholder="학교 이름을 입력해 주세요 (80자 제한)"
                    className="w-full"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-start items-center w-full">
                <label
                  htmlFor="schoolNameEn"
                  className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
                >
                  학교 영어 이름
                </label>
                <div className="flex-1 min-w-0">
                  <Input
                    purpose="text"
                    id="schoolNameEn"
                    placeholder="학교 이름을 입력해 주세요 (80자 제한)"
                    className="w-full"
                    value={schoolNameEn}
                    onChange={(e) => setSchoolNameEn(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-start items-center">
                <label
                  htmlFor="school-year"
                  className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
                >
                  졸업연도
                  <Asterisk className="text-red w-4 h-4" />
                </label>
                <div className="flex-1 min-w-0">
                  <Select
                    purpose="year"
                    defaultValue="졸업 연도를 선택해주세요."
                    SelectClass="w-full"
                    onChange={(value) => setGraduationYear(value)}
                  />
                </div>
              </div>
              <div className="flex justify-start items-start">
                <label
                  htmlFor="school-logo"
                  className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
                >
                  학교 로고
                  <Asterisk className="text-red w-4 h-4" />
                </label>
                <div className="flex-1 min-w-0">
                  <FileInput
                    id="school-logo"
                    className="w-full"
                    onChange={(files) => {
                      if (!files) return;
                      const file = files instanceof FileList ? files[0] : files;
                      handleFileSelect(file);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'admin':
        return (
          <div className="bg-white w-full h-full p-5 border border-border-section rounded-xl shadow-dropdown md:w-[1080px] md:min-h-[753px] md:p-10">
            <header className="relative flex flex-col justify-start gap-2 md:gap-1">
              <ol className="flex justify-start items-center">
                <li>
                  <Badge>기본 정보</Badge>
                </li>
                <ChevronRight className="w-4 h-4 text-gray-500" />
                <li>
                  <Badge active>행정 정보</Badge>
                </li>
              </ol>
              <h3 className="text-24 text-gray-900 font-semibold">행정 정보</h3>
              <div className="absolute right-0 bottom-0 flex items-center gap-2">
                <Button
                  className="text-gray-900 bg-white border border-gray-300 rounded-lg px-3 py-1.5"
                  onClick={GO_PREV_STEP}
                >
                  뒤로 가기
                </Button>
                <Button
                  className="text-white bg-primary-700 rounded-lg px-3 py-1.5"
                  onClick={handleSchoolRegister}
                >
                  추가 하기
                </Button>
              </div>
            </header>
            <Divider gap={6} mdGap={8} />
            <div className="flex flex-col gap-6">
              <div className="flex justify-start items-center w-full">
                <label
                  htmlFor="school-admin-name"
                  className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
                >
                  담당자 이름
                  <Asterisk className="text-red w-4 h-4" />
                </label>
                <div className="flex-1 min-w-0">
                  <Input
                    purpose="text"
                    id="school-admin-name"
                    placeholder="담당자 이름을 입력해 주세요."
                    className="w-full"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-start items-start w-full flex-col md:flex-row md:items-center">
                <label
                  htmlFor="school-admin-contact"
                  className="flex justify-start items-center gap-0.5 text-18 text-gray-800 md:w-[200px]"
                >
                  전화번호
                  <Asterisk className="text-red w-4 h-4" />
                </label>
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <Input
                    purpose="text"
                    id="school-admin-contact"
                    placeholder="010"
                    className="w-full"
                    value={adminPhone.slice(0, 3)}
                    onChange={(e) => setAdminPhone(e.target.value) + adminPhone.slice(3)}
                  />
                  <Input
                    purpose="text"
                    id="school-admin-contact"
                    placeholder="1234"
                    className="w-full"
                    value={adminPhone.slice(3, 7)}
                    onChange={(e) =>
                      setAdminPhone(adminPhone.slice(0, 3) + e.target.value + adminPhone.slice(7))
                    }
                  />
                  <Input
                    purpose="text"
                    id="school-admin-contact"
                    placeholder="5678"
                    className="w-full"
                    value={adminPhone.slice(7)}
                    onChange={(e) => setAdminPhone(adminPhone.slice(0, 7) + e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-start items-center w-full">
                <label
                  htmlFor="school-admin-email"
                  className="flex justify-start items-center gap-0.5 text-18 text-gray-800 md:w-[200px]"
                >
                  이메일
                  <Asterisk className="text-red w-4 h-4" />
                </label>
                <div className="flex-1 min-w-0">
                  <Input
                    purpose="text"
                    id="school-admin-email"
                    placeholder="예) example@univ.com"
                    className="w-full"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section className="flex flex-col h-full gap-2 md:gap-4">
      <PageHeader title="학교 추가하기" />
      {RenderStep()}
    </section>
  );
}
