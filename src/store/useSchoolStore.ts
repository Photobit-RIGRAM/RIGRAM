import { supabase } from '@/utils/supabase/client';
import { create } from 'zustand';

interface SchoolTable {
  id?: string;
  school_name?: string;
  school_en_name?: string;
  graduation_year?: string;
  school_img_url?: string;
  manager_name?: string;
  manager_email?: string;
  manager_contact?: string;
  created_at?: string;
}

interface SchoolStore {
  school: SchoolTable[];
  isLoading: boolean;
  fetchSchools: () => Promise<void>;
}

export const useSchoolStore = create<SchoolStore>((set) => ({
  school: [],
  isLoading: false,
  fetchSchools: async () => {
    try {
      set({ isLoading: true });
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw userError ?? new Error('로그인된 유저가 없습니다.');

      const { data } = await supabase.from('schools').select('*').eq('id', user?.id);
      set({ school: data ?? [], isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));
