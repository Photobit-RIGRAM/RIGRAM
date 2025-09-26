import type { Student } from '@/types/student';
import { supabase } from '@/utils/supabase/client';
import { create } from 'zustand';

interface StudentsState {
  student: Student | null;
  students: Student[];
  isLoading: boolean;
  error: string | null;
  fetchStudents: (departmentId: string) => Promise<void>;
  fetchStudentById: (studentId: string) => Promise<void>;
}

export const useStudentStore = create<StudentsState>((set) => ({
  student: null,
  students: [],
  isLoading: false,
  error: null,

  // schoolId, departmentId를 사용한 students 불러오기
  fetchStudents: async (departmentId) => {
    set({ isLoading: true, error: null });

    const { data, error } = await supabase
      .from('students')
      .select('*')
      // .eq('school_id', schoolId)
      .eq('dept_id', departmentId);

    if (error) {
      set({ isLoading: false, error: error.message });
    } else {
      set({ students: data || [], isLoading: false });
    }
  },

  // student의 id를 사용한 학생 불러오기
  fetchStudentById: async (studentId) => {
    set({ isLoading: true, error: null });

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', studentId)
      .single();

    if (error) {
      set({ isLoading: false, error: error.message });
    } else {
      set({ student: data, isLoading: false });
    }
  },
}));
