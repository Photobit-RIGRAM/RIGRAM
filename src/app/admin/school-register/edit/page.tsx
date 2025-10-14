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
import { useEffect, useState } from 'react';

export default function SchoolEditPage() {
  const router = useRouter();
  const { school, fetchSchool, editSchool } = useSchoolStore();
  const [currentStep, setCurrentStep] = useState<'basic' | 'admin'>('basic');
  const [form, setForm] = useState({
    schoolName: '',
    schoolNameEn: '',
    graduationYear: '',
    schoolLogo: '' as string | File,
    adminName: '',
    adminPhone: '',
    adminEmail: '',
  });

  const GO_NEXT_STEP = () => setCurrentStep('admin');
  // const GO_PREV_STEP = () => setCurrentStep('basic');

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await fetchSchool(user.id);
      }
    };

    getData();
  }, [fetchSchool]);

  useEffect(() => {
    if (school) {
      setForm({
        schoolName: school.school_name ?? '',
        schoolNameEn: school.school_en_name ?? '',
        graduationYear: school.graduation_year ?? '',
        schoolLogo: school.school_img_url ?? '',
        adminName: school.manager_name ?? '',
        adminPhone: school.manager_contact ?? '',
        adminEmail: school.manager_email ?? '',
      });
    }
  }, [school]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleEdit = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    let logoUrl = typeof form.schoolLogo === 'string' ? form.schoolLogo : '';

    if (form.schoolLogo instanceof File) {
      const file = form.schoolLogo;
      const fileExt = file.name.split('.').pop();
      const filePath = `school-logos/${form.schoolNameEn}.${fileExt}`;

      await supabase.storage.from('school-logos').remove([filePath]);

      const { error: uploadError } = await supabase.storage
        .from('school-logos')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error('파일 업로드 실패:', uploadError);
        alert('파일 업로드에 실패했습니다.');
        return;
      }

      const { data: urlData } = supabase.storage.from('school-logos').getPublicUrl(filePath);
      logoUrl = urlData.publicUrl;
    }

    await editSchool(
      {
        school_name: form.schoolName,
        school_en_name: form.schoolNameEn,
        graduation_year: form.graduationYear,
        school_img_url: logoUrl,
        manager_name: form.adminName,
        manager_contact: form.adminPhone,
        manager_email: form.adminEmail,
      },
      user.id
    );

    alert('학교 정보가 수정되었습니다. 메인 페이지로 이동합니다.');
    router.replace(`/admin/${school?.id}`);
  };

  const RenderStep = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <div className="bg-white w-full h-full p-5 border border-border-section rounded-xl shadow-dropdown md:w-[1080px] md:min-h-[753px] md:p-10">
            <header className="relative flex flex-col justify-start gap-1">
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
                    value={form.schoolName}
                    onChange={handleChange}
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
                    value={form.schoolNameEn}
                    onChange={handleChange}
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
                    defaultValue={form.graduationYear || '졸업 연도를 선택해주세요.'}
                    SelectClass="w-full"
                    onChange={(value) => setForm({ ...form, graduationYear: value })}
                  />
                </div>
              </div>
              <div className="flex justify-start items-center">
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
                      setForm((prev) => ({ ...prev, schoolLogo: file }));
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
            <header className="relative flex flex-col justify-start gap-1">
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
                <Button className="text-gray-900 bg-white border border-gray-300 rounded-lg px-3 py-1.5">
                  뒤로 가기
                </Button>
                <Button
                  className="text-white bg-primary-700 rounded-lg px-3 py-1.5"
                  onClick={handleEdit}
                >
                  수정 하기
                </Button>
              </div>
            </header>
            <Divider gap={6} mdGap={8} />
            <div className="flex flex-col gap-6">
              <div className="flex justify-start items-center w-full">
                <label
                  htmlFor="adminName"
                  className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
                >
                  담당자 이름
                  <Asterisk className="text-red w-4 h-4" />
                </label>
                <div className="flex-1 min-w-0">
                  <Input
                    purpose="text"
                    id="adminName"
                    placeholder="담당자 이름을 입력해 주세요."
                    className="w-full"
                    value={form.adminName}
                    onChange={handleChange}
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
                    value={form.adminPhone.slice(0, 3)}
                    onChange={(e) =>
                      setForm({ ...form, adminPhone: e.target.value + form.adminPhone.slice(3) })
                    }
                  />
                  <Input
                    purpose="text"
                    id="school-admin-contact"
                    placeholder="1234"
                    className="w-full"
                    value={form.adminPhone.slice(3, 7)}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        adminPhone:
                          form.adminPhone.slice(0, 3) + e.target.value + form.adminPhone.slice(7),
                      })
                    }
                  />
                  <Input
                    purpose="text"
                    id="school-admin-contact"
                    placeholder="5678"
                    className="w-full"
                    value={form.adminPhone.slice(7)}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        adminPhone: form.adminPhone.slice(0, 7) + e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-start items-center w-full">
                <label
                  htmlFor="adminEmail"
                  className="flex justify-start items-center gap-0.5 text-18 text-gray-800 md:w-[200px]"
                >
                  이메일
                  <Asterisk className="text-red w-4 h-4" />
                </label>
                <div className="flex-1 min-w-0">
                  <Input
                    purpose="text"
                    id="adminEmail"
                    placeholder="예) example@univ.com"
                    className="w-full"
                    value={form.adminEmail}
                    onChange={handleChange}
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
      <PageHeader title="학교 수정하기" />
      {RenderStep()}
    </section>
  );
}
