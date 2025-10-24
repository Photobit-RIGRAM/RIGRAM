'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { supabase } from '@/utils/supabase/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'admin' | 'student'>('admin');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) console.error('로그인 중 오류가 발생했습니다. :', error.message);

      const currentUser = data.user;
      if (!currentUser) throw new Error('아이디 또는 비밀번호를 확인해주세요.');

      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id, school_name_en, user_type')
        .eq('id', currentUser.id)
        .single();
      if (usersError || !users) throw new Error('사용자 정보를 불러오지 못했습니다.');

      if (users.user_type !== userType)
        throw new Error(`선택한 권한(${userType})이 아닙니다. 다시 한 번 확인해주세요.`);

      localStorage.setItem('schoolId', users.id);
      localStorage.setItem('userType', users.user_type);

      if (!users.school_name_en) {
        // 학교 등록이 안된 경우
        router.replace('/admin/school-register');
      } else if (users.id && users.school_name_en) {
        // 유저가 존재하면 유저 페이지로 이동
        router.replace(`/admin/${users.id}`);
      }
      // if (!userData.school_name_en) {
      //   router.replace(`/${userData.role}/school-register`);
      // } else {
      //   router.replace(`/${userData.role}/${userData.id}`);
      // }
    } catch (error: unknown) {
      console.error(error);
      setError(error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full h-full flex flex-col justify-center items-center px-5">
      <div className="w-full md:max-w-[520px]">
        <figure className="flex flex-col items-center gap-4 md:gap-7">
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <Image
              src={`/images/logo.png`}
              alt="리그램 로고"
              fill
              sizes="(max-width: 768px) 64px, 80px"
              className="object-contain"
            />
          </div>
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

        <form action="" className="flex flex-col gap-4 md:gap-5" onSubmit={handleLogin}>
          <div className="flex justify-center gap-4 mb-4">
            {['admin', 'student'].map((role) => (
              <label
                key={role}
                className={`px-6 py-2 rounded-full border text-sm font-medium cursor-pointer transition-all duration-200
                ${
                  userType === role
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={userType === role}
                  onChange={() => setUserType(role as 'admin' | 'student')}
                  className="hidden"
                />
                {role}
              </label>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <Input
              purpose="id"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              purpose="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-gray-900 text-white text-18 py-4 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
        </form>
      </div>
    </section>
  );
}
