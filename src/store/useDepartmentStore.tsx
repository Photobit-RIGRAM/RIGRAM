import { supabase } from '@/utils/supabase/client';
import { create } from 'zustand';

type Department = {
  id: string;
  college_id: string;
  name: string;
  name_en: string;
  desc: string;
  img_url: string | null;
  created_at: string;
  updated_at: string;
};

interface DepartmentsState {
  departments: Department[];
  loading: boolean;
  error: string | null;
  fetchDepartments: (collegeId: string) => Promise<void>;
  fetchDepartmentById: (departmentId: string) => Promise<Department | null>;
  addDepartment: (
    college_id: string,
    name: string,
    name_en: string,
    desc: string,
    img_url: string | null
  ) => Promise<void>;
}

export const useDepartmentStore = create<DepartmentsState>((set, get) => ({
  departments: [],
  loading: false,
  error: null,

  // 학교ID별 모든 학과 조회
  fetchDepartments: async (collegeId: string) => {
    set({ loading: true, error: null });

    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('college_id', collegeId);

    if (error) {
      set({ error: error.message, loading: false });
    } else {
      const current = get().departments.filter((d) => d.college_id !== collegeId);
      set({
        departments: [...current, ...(data ?? [])],
        loading: false,
      });
    }
  },
  // 단일 학과 조회
  fetchDepartmentById: async (departmentId: string) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('id', departmentId)
      .single();

    if (error) {
      set({ error: error.message, loading: false });
      return null;
    } else {
      // 이미 있으면 교체, 없으면 추가
      set((state) => {
        const exists = state.departments.some((d) => d.id === data.id);
        if (exists) {
          return {
            departments: state.departments.map((d) => (d.id === data.id ? data : d)),
            loading: false,
          };
        }
        return { departments: [...state.departments, data], loading: false };
      });
      return data;
    }
  },
  // 학과 추가하기
  addDepartment: async (collegeId, name, nameEn, desc, img_url) => {
    const { data, error } = await supabase
      .from('departments')
      .insert([{ college_id: collegeId, name, name_en: nameEn, desc, img_url }])
      .select()
      .single();

    if (error) {
      console.error('Insert error:', error);
      set({ error: error.message });
    } else if (data) {
      set((state) => {
        const exists = state.departments.some((d) => d.id === data.id);
        if (exists) return state;
        return { departments: [...state.departments, data] };
      });
    }
  },
}));
