import { createClient } from '@/lib/supabase/client';

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('test_user').select('*');
  if (error) console.error(error);

  console.log(data);

  return <div>Home페이지</div>;
}
