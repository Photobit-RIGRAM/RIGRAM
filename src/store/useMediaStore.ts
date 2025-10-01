import { Media } from '@/types/media';
import { supabase } from '@/utils/supabase/client';
import { create } from 'zustand';

interface MediaState {
  media: Media | null;
  mediaList: Media[];
  isLoading: boolean;
  error: string | null;

  fetchMediaList: (departmentId: string) => Promise<void>;
  // fetchMediaById: (mediaId: string) => Promise<void>;
  addMedia: (
    school_id: string,
    department_id: string,
    url: string | null,
    type: 'photo' | 'video',
    category: 'all' | 'team' | 'organization' | 'club' | 'event',
    video_thumbnail: string | null
  ) => Promise<void>;
  deleteMedia: (departmentId: string, mediaId: string) => Promise<boolean>;
}

export const useMediaStore = create<MediaState>((set) => ({
  media: null,
  mediaList: [],
  isLoading: false,
  error: null,

  fetchMediaList: async (departmentId) => {
    set({ isLoading: true, error: null });

    const { data, error } = await supabase
      .from('media')
      .select('*')
      .eq('department_id', departmentId);

    if (error) {
      set({ isLoading: false, error: error.message });
    } else {
      set({ mediaList: data || [], isLoading: false });
    }
  },

  addMedia: async (school_id, department_id, url, type, category, video_thumbnail) => {
    set({ isLoading: true, error: null });

    const { data, error } = await supabase
      .from('media')
      .insert([{ school_id, department_id, url, type, category, video_thumbnail }])
      .single();

    if (error) {
      console.error('사진 또는 동영상 추가 중 오류가 발생했습니다. :', error);
      alert('사진 또는 동영상 추가 중 오류가 발생했습니다.');
      return;
    } else {
      set((state) => ({
        mediaList: [data, ...state.mediaList],
        isLoading: false,
      }));
      alert('사진 또는 동영상이 성공적으로 추가되었습니다.');
    }
  },
  deleteMedia: async (departmentId, mediaId) => {
    set({ isLoading: true, error: null });

    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', mediaId)
      .eq('department_id', departmentId);

    if (error) {
      console.error('사진 또는 동영상 삭제 중 오류가 발생했습니다. :', error);
      set({ isLoading: false, error: error.message });
      return false;
    }

    set((state) => ({
      mediaList: state.mediaList.filter((media) => media.id !== mediaId),
    }));

    return true;
  },
}));
