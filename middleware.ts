import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  // 이미 로그인했으면 /login, / 접근 막기
  if (session && (pathname === '/' || pathname.startsWith('/login'))) {
    return NextResponse.redirect(new URL(`/${session.user.id}`, req.url));
  }

  // 로그인 안 된 경우 보호된 경로 접근 차단
  if (!session && pathname.startsWith('/protected')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/protected/:path*', '/:schoolId/:path*'],
};
