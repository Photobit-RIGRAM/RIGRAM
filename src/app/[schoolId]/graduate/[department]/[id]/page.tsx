import Button from '@/components/button';
import { ArrowLeft, Calendar, Dot, Mail, Phone, User } from 'lucide-react';

const StudentData = {
  id: '0',
  name: '김OO',
  en_name: 'KimOO',
  department: '국문학과',
  manager: '다OO',
  email: 'kimEmail@gmail.com',
  phone: '010-1234-5678',
  photo_id: 'https://cdn.pixabay.com/photo/2019/08/01/12/19/raccoon-4377383_1280.jpg',
  photo_graduation: 'https://cdn.pixabay.com/photo/2023/11/05/12/57/squirrel-8367079_1280.jpg',
  created: '2022-01-01',
  updated: '2025-01-01',
};

export default function GraduateDepartmentPage() {
  return (
    <section className="relative w-full h-full border border-border rounded-xl shadow-dropdown">
      <div className="z-10 px-5 pt-5 relative mb-4 md:absolute md:left-0 md:top-0 md:transform md:-translate-y-12 flex justify-start items-center gap-1 text-gray-900 md:px-0 md:pt-0">
        <Button href={'/main/school/department'}>
          <ArrowLeft className="w-8 h-8" />
        </Button>
        <h3 className="text-20 font-semibold">졸업생 상세 정보</h3>
      </div>
      <div className="absolute top-0 right-0 left-0 h-40 z-0">
        <img
          src="https://cdn.pixabay.com/photo/2025/08/09/16/51/wildlife-9764923_1280.jpg"
          alt="학과대표이미지"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative flex flex-col gap-10 justify-start items-start w-full h-full pt-10 px-5 md:px-10 md:pt-35">
        <div className="flex flex-col justify-center items-center gap-2 w-full md:gap-4 md:justify-start md:items-end md:flex-row">
          <div className="flex justify-start items-center gap-1">
            <div className="w-30 h-30 bg-white p-1 rounded-4xl overflow-hidden">
              <img
                src={StudentData.photo_id}
                alt="증명사진"
                className="w-full h-full object-cover rounded-4xl"
              />
            </div>
            <div className="w-30 h-30 bg-white p-1 rounded-4xl overflow-hidden">
              <img
                src={StudentData.photo_graduation}
                alt="증명사진"
                className="w-full h-full object-cover rounded-4xl"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 items-center md:items-start">
            <h3 className="text-18 md:text-22 text-gray-900 font-semibold">{StudentData.name}</h3>
            <div className="flex items-center gap-2 text-16 text-gray-600 font-medium">
              <span>{StudentData.department}</span>
              <Dot />
              <span>{StudentData.en_name}</span>
            </div>
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
              <dd className="text-gray-900">{StudentData.name}</dd>
            </div>
            <div className="flex justify-start items-center gap-2 text-18 font-medium">
              <dt className="flex items-center gap-2 text-gray-600 w-26 md:w-36">
                <Mail />
                <span>이메일</span>
              </dt>
              <dd className="text-gray-900">{StudentData.email}</dd>
            </div>
            <div className="flex justify-start items-center gap-2 text-18 font-medium">
              <dt className="flex items-center gap-2 text-gray-600 w-26 md:w-36">
                <Phone />
                <span>전화번호</span>
              </dt>
              <dd className="text-gray-900">{StudentData.phone}</dd>
            </div>
            <div className="flex justify-start items-center gap-2 text-18 font-medium">
              <dt className="flex items-center gap-2 text-gray-600 w-26 md:w-36">
                <Calendar />
                <span>생성일</span>
              </dt>
              <dd className="text-gray-900">{StudentData.created}</dd>
            </div>
            <div className="flex justify-start items-center gap-2 text-18 font-medium">
              <dt className="flex items-center gap-2 text-gray-600 w-26 md:w-36">
                <Calendar />
                <span>수정일</span>
              </dt>
              <dd className="text-gray-900">{StudentData.updated}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
