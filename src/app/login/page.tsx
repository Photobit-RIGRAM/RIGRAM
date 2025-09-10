import logo from '../../../public/images/logo.png';
import Button from '@/components/button';
import Checkbox from '@/components/checkbox';
import Input from '@/components/input';
import Radio from '@/components/radio';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center px-5">
      <div className="w-full md:max-w-[520px]">
        <figure className="flex flex-col items-center gap-4 md:gap-7">
          <Image src={logo} alt="리그램 로고" className="w-16 h-16 md:w-20 md:h-20" />
          <figcaption className="flex flex-col items-center gap-1">
            <h3 className="text-28 md:text-32 font-bold text-gray-900 uppercase">
              photobit - rigram
            </h3>
            <p className="text-16 md:text-20 text-gray-700">추억을 빛내는 디지털 앨범 리그램</p>
          </figcaption>
        </figure>
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-400"></div>
          <span className="text-14 md:text-16 px-4 text-gray-400">로그인</span>
          <div className="flex-grow h-px bg-gray-400"></div>
        </div>
        <form action="" className="flex flex-col gap-4 md:gap-5">
          <Radio />
          <div className="flex flex-col gap-4">
            <Input purpose="id" />
            <Input purpose="password" />
          </div>
          <Checkbox purpose="id" />
          <Button className="w-full bg-gray-900 text-white text-18 py-4 rounded-lg">로그인</Button>
        </form>
      </div>
    </section>
  );
}
