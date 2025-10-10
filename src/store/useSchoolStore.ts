import { supabase } from '@/utils/supabase/client';
import { create } from 'zustand';

// import { createJSONStorage, persist } from 'zustand/middleware';

interface SchoolTable {
  id?: string;
  school_name?: string;
  school_en_name?: string;
  graduation_year?: string;
  school_img_url?: File | string | null;
  manager_name?: string;
  manager_email?: string;
  manager_contact?: string;
  created_at?: string;
  updated_at?: string;
}

interface SchoolStore {
  school: SchoolTable | null;
  isLoading: boolean;
  fetchSchool: (useId: string) => Promise<void>;
  addSchool: (data: SchoolTable, userId: string) => Promise<void>;
  editSchool: (data: SchoolTable, userId: string) => Promise<void>;
}

interface SchoolFormState {
  schoolName: string;
  schoolNameEn: string;
  graduationYear: string;
  schoolLogo: File | string | null;
  adminName: string;
  adminPhone: string;
  adminEmail: string;

  setSchoolName: (name: string) => void;
  setSchoolNameEn: (nameEn: string) => void;
  setGraduationYear: (year: string) => void;
  setSchoolLogo: (logo: File | string | null) => void;
  setAdminName: (adminName: string) => void;
  setAdminPhone: (adminPhone: string) => void;
  setAdminEmail: (adminEmail: string) => void;
}

export const useSchoolStore = create<SchoolStore & SchoolFormState>()((set) => ({
  school: null,
  isLoading: false,

  // 학교 불러오기
  fetchSchool: async (userId) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('schools').select('*').eq('id', userId).single();
      if (error) throw error;
      set({ school: data, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ school: null, isLoading: false });
    }
  },
  // 학교 추가하기
  addSchool: async (data, userId) => {
    try {
      const { error } = await supabase.from('schools').update(data).eq('id', userId);
      if (error) throw error;

      set({ school: { ...(data as SchoolTable), id: userId } });
    } catch (error) {
      console.error(error);
    }
  },
  // 학교 수정하기
  editSchool: async (data, userId) => {
    try {
      const { error } = await supabase
        .from('schools')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', userId);
      if (error) throw error;

      set((state) => ({
        school: state.school ? { ...state.school, ...data } : null,
      }));
    } catch (error) {
      console.error(error);
    }
  },

  schoolName: '',
  schoolNameEn: '',
  graduationYear: '',
  schoolLogo: null,
  adminName: '',
  adminPhone: '',
  adminEmail: '',

  setSchoolName: (name) => set({ schoolName: name }),
  setSchoolNameEn: (nameEn) => set({ schoolNameEn: nameEn }),
  setGraduationYear: (year) => set({ graduationYear: year }),
  setSchoolLogo: (logoUrl) => set({ schoolLogo: logoUrl }),
  setAdminName: (adminName: string) => set({ adminName }),
  setAdminPhone: (adminPhone: string) => set({ adminPhone }),
  setAdminEmail: (adminEmail: string) => set({ adminEmail }),
}));
