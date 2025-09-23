'use client';

import { useSchoolStore } from '@/store/useSchoolStore';
import Link from 'next/link';
import { useState } from 'react';

const TOP_TAB = [
  { id: '0', title: '학과 관리', url: 'department' },
  { id: '1', title: '졸업생 관리', url: 'graduate' },
  { id: '2', title: '단체 사진', url: 'photo' },
  { id: '3', title: '학교 소개 관리', url: 'introduction' },
];

export default function TopTab() {
  const school = useSchoolStore((state) => state.school);
  const [isActive, setIsActive] = useState('0');
  const handleTab = (id: string) => {
    setIsActive(id);
  };
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-');
  const schoolId = slugify(school?.school_en_name ?? '');

  return (
    <ul className="flex items-center gap-2 md:gap-4">
      {TOP_TAB.map((tab) => (
        <li key={tab.id} className="flex">
          <Link
            href={`/${schoolId}/${tab.url}`}
            className={`text-14 md:text-16 rounded-md px-2 py-2 md:px-4 md:py-2.5 ${isActive === tab.id ? 'bg-gray-200 text-gray-800 font-bold' : 'text-gray-600 font-medium'} hover:bg-gray-200 hover:text-gray-800 hover:font-bold focus:bg-gray-200 focus:text-gray-800 focus:font-bold active:bg-gray-200 active:text-gray-800 active:font-bold`}
            onClick={() => handleTab(tab.id)}
          >
            {tab.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
