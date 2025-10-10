import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  href?: string;
  title?: string;
  subTitle?: string;
  imgSrc?: string;
  variant?: 'default' | 'add';
}

export default function Card({ href, title, subTitle, imgSrc, variant = 'default' }: CardProps) {
  if (variant === 'add') {
    return (
      <Link
        href={href || '#'}
        className="flex justify-center items-center h-40 md:h-64 w-full rounded-xl border border-gray-300 shadow-dropdown overflow-hidden hover:font-bold hover:border-gray-500 focus:font-bold focus:border-gray-500 active:font-bold active:border-gray-500"
      >
        <div className="flex items-center gap-1 text-gray-500">
          <Plus />
          <span>학과 추가하기</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href || '#'}
      className="flex flex-row md:flex-col h-40 md:h-64 w-full rounded-xl border border-gray-300 shadow-dropdown overflow-hidden hover:font-bold hover:border-gray-500 focus:font-bold focus:border-gray-500 active:font-bold active:border-gray-500"
    >
      <div className="relative w-1/2 md:w-full md:h-40">
        <Image
          src={imgSrc || '/images/default-dept.png'}
          alt={title || ''}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 px-5 py-4">
        <h3 className="text-gray-800">{title}</h3>
        <p className="text-gray-500">{subTitle}</p>
      </div>
    </Link>
  );
}
