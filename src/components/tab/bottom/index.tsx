'use client';

import Link from 'next/link';
import { useState } from 'react';

const BOTTOM_TAB = {
  department: [
    { id: '0', title: '기본 정보', url: '#' },
    { id: '1', title: '소개', url: '#' },
    { id: '2', title: '교직원', url: '#' },
    { id: '3', title: '학생회', url: '#' },
  ],
  organization: [
    { id: '0', title: '전체', url: '#' },
    { id: '1', title: '팀', url: '#' },
    { id: '2', title: '단체', url: '#' },
    { id: '3', title: '동아리', url: '#' },
    { id: '4', title: '행사', url: '#' },
  ],
  school_intro: [
    { id: '0', title: '전경', url: '#' },
    { id: '1', title: '연혁', url: '#' },
    { id: '2', title: '상징', url: '#' },
    { id: '3', title: '임원진', url: '#' },
  ],
};

export default function BottomTab({
  purpose,
  className,
}: {
  purpose: keyof typeof BOTTOM_TAB;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState('0');

  const handleTab = (id: string) => {
    setActiveTab(id);
  };

  const getTabData = () => {
    return BOTTOM_TAB[purpose] || [];
  };

  const tabData = getTabData();

  return (
    <ul
      className={`inline-flex items-center gap-1 w-fit p-1 bg-tab-bg-bottom rounded-4xl ${className || ''}`}
    >
      {tabData.map((tab) => (
        <li key={tab.id} className="inline-flex">
          <Link
            href={tab.url}
            className={`text-14 md:text-16 text-white rounded-4xl px-4 py-2 md:px-6 md:py-2 ${
              activeTab === tab.id ? 'bg-tab-bg-bottom-active font-bold' : 'font-medium'
            } hover:bg-tab-bg-bottom-active hover:font-bold focus:bg-tab-bg-bottom-active focus:font-bold active:bg-tab-bg-bottom-active active:font-bold`}
            onClick={() => handleTab(tab.id)}
          >
            {tab.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
