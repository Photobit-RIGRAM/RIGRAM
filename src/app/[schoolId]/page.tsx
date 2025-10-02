'use client';

import Button from '@/components/button';
import { useSchoolStore } from '@/store/useSchoolStore';
import { supabase } from '@/utils/supabase/client';
import { Calendar, GraduationCap, Mail, PencilLine, Phone, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';

const MENU_LIST = [
  {
    id: '0',
    title: '학과 관리',
    subTitle: '학과 추가, 소개 관리',
    url: 'department',
    img_url: '/images/menu01.png',
  },
  {
    id: '1',
    title: '졸업생 관리',
    subTitle: '졸업생 추가, 정보 관리',
    url: 'graduate',
    img_url: '/images/menu02.png',
  },
  {
    id: '2',
    title: '단체 사진',
    subTitle: '학과별 단체, 사진 관리',
    url: 'photo',
    img_url: '/images/menu03.png',
  },
  {
    id: '3',
    title: '학과 소개 관리',
    subTitle: '전경 / 연혁 / 상진 / 운영진',
    url: 'introduction',
    img_url: '/images/menu04.png',
  },
] as const;

export default function SchoolMainPage() {
  const pathname = usePathname();
  const fetchSchool = useSchoolStore((state) => state.fetchSchool);
  const isLoading = useSchoolStore((state) => state.isLoading);
  const school = useSchoolStore((state) => state.school);

  useEffect(() => {
    const getAuthData = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) {
          console.error('사용자 정보를 가져오는데 실패했습니다. :', error);
          return;
        }
        if (user) {
          await fetchSchool(user.id);
        } else {
          console.error('로그인이 되지 않았습니다. 다시 한 번 확인해 주세요.');
        }
      } catch (error) {
        console.error('사용자 정보를 가져오는데 실패했습니다. :', error);
      }
    };

    getAuthData();
  }, [fetchSchool]);

  const InfoConfig = useMemo(
    () => [
      {
        id: '0',
        icon: <User />,
        title: '담당자',
        content: `${school?.manager_name}`,
      },
      {
        id: '1',
        icon: <Mail />,
        title: '이메일',
        content: `${school?.manager_email}`,
      },
      {
        id: '2',
        icon: <Phone />,
        title: '연락처',
        content: `${school?.manager_contact}`,
      },
      {
        id: '3',
        icon: <Calendar />,
        title: '생성일',
        content: `${school?.created_at?.slice(0, 10)}`,
      },
      {
        id: '4',
        icon: <Calendar />,
        title: '수정일',
        content: `${school?.updated_at?.slice(0, 10)}`,
      },
    ],
    [school]
  );

  if (isLoading) {
    return (
      <div
        className="flex justify-center items-center min-h-[400px]"
        role="status"
        aria-live="polite"
      >
        <span className="text-gray-600">로딩 중...</span>
      </div>
    );
  }

  if (!school) {
    return (
      <div
        className="flex justify-center items-center min-h-[400px]"
        role="alert"
        aria-live="assertive"
      >
        <span className="text-gray-600">학교 정보를 불러올 수 없습니다.</span>
      </div>
    );
  }

  const schoolLogoUrl =
    school.school_img_url instanceof File
      ? URL.createObjectURL(school.school_img_url)
      : school.school_img_url || '/images/default-school-logo.png';

  return (
    <section className="flex flex-col justify-center items-center gap-5 w-full md:flex-row md:gap-4">
      <h1 className="sr-only">학교 정보 메인 페이지 - 학교 등록이 되어있을 경우</h1>

      <article className="w-full md:w-[532px] h-full flex flex-col gap-13 bg-white p-6 md:px-18 shadow-dropdown md:pt-[52px] md:pb-[120px] rounded-xl">
        <div className="flex flex-col items-center gap-6">
          <figure className="flex flex-col items-center gap-6">
            <div className="border border-gray-200 rounded-4xl p-4 md:p-6">
              <img
                src={schoolLogoUrl}
                alt={`${school?.school_name}학교 로고`}
                className="w-13 h-13"
              />
            </div>
            <figcaption className="flex flex-col items-center gap-1">
              <h3 className="text-20 md:text-24 font-semibold text-gray-900">
                {school?.school_name}
              </h3>
              <span className="text-16 md:text-20 font-regular text-gray-700">
                {school?.school_en_name}
              </span>
            </figcaption>
          </figure>
          <div className="flex items-center text-16 md:text-18 text-gray-800 gap-1">
            <GraduationCap />
            <span>{school?.graduation_year} 졸업</span>
          </div>
        </div>
        <span className="w-full h-px bg-gray-400"></span>
        <div className="w-full h-full flex flex-col gap-8 md:gap-10">
          <div className="flex justify-between items-center">
            <h3 className="text-18 text-gray-900 font-semibold">상세 정보</h3>
            <Button
              className="flex items-center text-16 text-gray-600 gap-1 hover:text-gray-700 hover:font-bold focus:text-gray-700 focus:font-bold focus:outline-gray-700 active:text-gray-700 active:font-bold"
              href={`/school-register/edit`}
            >
              <PencilLine className="w-4 h-4" />
              <span>정보 수정하기</span>
            </Button>
          </div>
          <dl className="flex flex-col gap-5">
            {InfoConfig.map((info) => (
              <div className="flex justify-start items-center gap-2" key={info.id}>
                <dt className="flex justify-start items-center gap-2 w-25 text-gray-500 md:w-29">
                  {info.icon}
                  <span className="text-16 md:text-18 flex-1 whitespace-nowrap">{info.title}</span>
                </dt>
                <dd className="text-16 md:text-18 overflow-ellipsis">{info.content}</dd>
              </div>
            ))}
          </dl>
        </div>
      </article>
      <nav
        className="w-full h-full flex flex-col justify-center items-center gap-4 md:w-[532px] md:grid md:grid-cols-2"
        aria-label="주요 메뉴"
      >
        <h2 className="sr-only">주요 관리 메뉴</h2>
        {MENU_LIST.map((menu) => (
          <Link
            key={menu.id}
            href={`${pathname}/${menu.url}`}
            className="w-full flex flex-row justify-center gap-4 items-center bg-primary-200 px-6 py-6 shadow-dropdown rounded-xl md:flex-col md:gap-12 md:py-21 hover:bg-primary-300 hover:outline hover:outline-primary-700 focus:bg-primary-300 focus:outline-primary-700 active:bg-primary-300 active:outline-primary-700"
            aria-label={`${menu.title}의 ${menu.subTitle} 관리 페이지로 이동`}
          >
            <div className="flex flex-col md:flex-col-reverse items-center justify-center gap-0.5">
              <h3 className="text-20 md:text-22 text-gray-900 font-semibold">{menu.title}</h3>
              <p className="text-14 md:text-16 text-gray-600 font-semibold text-center">
                {menu.subTitle}
              </p>
            </div>
            <div className="flex justify-center items-center w-20 h-20 md:w-[120px] md:h-[120px]">
              <Image
                src={menu.img_url}
                alt={menu.title}
                width={120}
                height={120}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </Link>
        ))}
      </nav>
    </section>
  );
}
