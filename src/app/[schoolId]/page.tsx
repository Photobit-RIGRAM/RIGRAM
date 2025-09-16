import Button from '@/components/button';
import Select from '@/components/select';
import Textarea from '@/components/textarea';
import { Calendar, GraduationCap, Mail, PencilLine, Phone, User } from 'lucide-react';
import Link from 'next/link';

const MenuConfig = [
  {
    id: '0',
    title: '학과 관리',
    subTitle: '학과 추가, 소개 관리',
    url: '/department',
    img_url: '/images/menu01.png',
  },
  {
    id: '1',
    title: '졸업생 관리',
    subTitle: '졸업생 추가, 정보 관리',
    url: '/graduate',
    img_url: '/images/menu02.png',
  },
  {
    id: '2',
    title: '단체 사진',
    subTitle: '학과별 단체, 사진 관리',
    url: '/단체사진',
    img_url: '/images/menu03.png',
  },
  {
    id: '3',
    title: '학과 소개 관리',
    subTitle: '전경 / 연혁 / 상진 / 운영진',
    url: '/학과소개관리',
    img_url: '/images/menu04.png',
  },
];

const InfoConfig = [
  {
    id: '0',
    icon: <User />,
    title: '담당자',
    content: '김OO',
  },
  {
    id: '1',
    icon: <Mail />,
    title: '이메일',
    content: 'icheonuniv@.gmail.com',
  },
  {
    id: '2',
    icon: <Phone />,
    title: '연락처',
    content: '010-1234-5678',
  },
  {
    id: '3',
    icon: <Calendar />,
    title: '생성일',
    content: '2022-01-01',
  },
  {
    id: '4',
    icon: <Calendar />,
    title: '수정일',
    content: '2025-01-01',
  },
];

export default function MainPage() {
  return (
    <section className="flex flex-col justify-center items-center gap-5 w-full md:flex-row md:gap-4">
      <h1 className="sr-only">학교 등록이 되어있을 경우</h1>
      <div className="w-full md:w-[532px] h-full flex flex-col gap-13 bg-white p-6 md:px-18 shadow-dropdown md:pt-[52px] md:pb-[120px] rounded-xl">
        <div className="flex flex-col items-center gap-6">
          <figure className="flex flex-col items-center gap-6">
            <div className="border border-gray-200 rounded-4xl p-4 md:p-6">
              <img
                src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FMGisk%2FbtrUgPi42Au%2FAAAAAAAAAAAAAAAAAAAAANDK3flsSQjwFGPl4Ku8rZupcHOLyd3GFmF5fli2-ugm%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DmnRqAYdJRdGIC0G48o9GqI2GMXY%253D"
                alt="인천대학교"
                className="w-13 h-13"
              />
            </div>
            <figcaption className="flex flex-col items-center gap-1">
              <h3 className="text-20 md:text-24 font-semibold text-gray-900">인천대학교</h3>
              <span className="text-16 md:text-20 font-regular text-gray-700">
                Incheon National University
              </span>
            </figcaption>
          </figure>
          <div className="flex items-center text-16 md:text-18 text-gray-800 gap-1">
            <GraduationCap />
            <span>2025 졸업</span>
          </div>
        </div>
        <span className="w-full h-px bg-gray-400"></span>
        <div className="w-full h-full flex flex-col gap-8 md:gap-10">
          <div className="flex justify-between items-center">
            <h3 className="text-18 text-gray-900 font-semibold">상세 정보</h3>
            <Button
              className="flex items-center text-16 text-gray-600 gap-1 hover:text-gray-700 hover:font-bold focus:text-gray-700 focus:font-bold focus:outline-gray-700 active:text-gray-700 active:font-bold"
              href={'#'}
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
      </div>
      <div className="w-full md:w-[532px] h-full flex flex-col gap-4 md:grid md:grid-cols-2 justify-center items-center">
        {MenuConfig.map((menu) => (
          <Link
            href={menu.url}
            key={menu.id}
            className="w-full flex flex-row justify-center gap-4 md:flex-col items-center md:gap-12 bg-primary-200 px-6 py-6 md:py-21 shadow-dropdown rounded-xl hover:bg-primary-300 focus:bg-primary-300 focus:outline-primary-700 active:bg-primary-300 active:outline-primary-700"
          >
            <div className="flex flex-col md:flex-col-reverse items-center justify-center gap-0.5">
              <h3 className="text-20 md:text-22 text-gray-900 font-semibold">{menu.title}</h3>
              <p className="text-14 md:text-16 text-gray-600 font-semibold text-center">
                {menu.subTitle}
              </p>
            </div>
            <div className="flex justify-center items-center w-20 h-20 md:w-[120px] md:h-[120px]">
              <img src={menu.img_url} alt={menu.title} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
