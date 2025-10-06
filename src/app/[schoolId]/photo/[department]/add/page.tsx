'use client';

import Badge from '@/components/badge';
import Button from '@/components/button';
import FileInput from '@/components/fileInput';
import { useDepartmentStore } from '@/store/useDepartmentStore';
import { useMediaStore } from '@/store/useMediaStore';
import { useSchoolStore } from '@/store/useSchoolStore';
import { supabase } from '@/utils/supabase/client';
import { Asterisk } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CATEGORY_OPTIONS = [
  { value: 'team', label: '팀' },
  { value: 'group', label: '단체' },
  { value: 'club', label: '동아리' },
  { value: 'event', label: '행사' },
];
type Category = 'team' | 'organization' | 'club' | 'event';

export default function PhotoAddPage() {
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname.split('/').filter(Boolean);
  const schoolId = segments[0];
  const departmentId = segments[2];
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [category, setCategory] = useState<Category>('team');
  const addMedia = useMediaStore((state) => state.addMedia);
  const school = useSchoolStore((state) => state.school);
  const schoolNameEn = school?.school_en_name || '';
  const fetchDepartmentById = useDepartmentStore((state) => state.fetchDepartmentById);
  const [deptNameEn, setDeptNameEn] = useState('');

  useEffect(() => {
    const loadDepartment = async () => {
      try {
        const dept = await fetchDepartmentById(departmentId);
        if (dept?.name_en) {
          setDeptNameEn(dept.name_en);
        }
      } catch (error) {
        console.error('Department 조회 실패:', error);
      }
    };

    if (departmentId) {
      loadDepartment();
    }
  }, [departmentId, fetchDepartmentById]);

  /** 파일 업로드 (Supabase Storage) */
  const uploadFile = async (file: File, folder: 'media' | 'thumbnail') => {
    const filePath = `${schoolNameEn}/${deptNameEn}/${folder}/${file.name}`;

    const { error } = await supabase.storage.from('media').upload(filePath, file, { upsert: true });

    if (error) {
      console.error(`${folder} 업로드 실패:`, error.message);
      alert(`${folder} 업로드 실패`);
      return null;
    }

    const { data } = supabase.storage.from('media').getPublicUrl(filePath);

    return data?.publicUrl ?? null;
  };

  const handleAddMedia = async () => {
    if (!mediaFile) {
      alert('사진 또는 동영상을 선택해주세요.');
      return;
    }

    try {
      // 1. 파일 업로드
      const mediaUrl = await uploadFile(mediaFile, 'media');
      if (!mediaUrl) return;

      let thumbnailUrl: string | null = null;
      if (mediaFile.type.startsWith('video') && thumbnail) {
        thumbnailUrl = await uploadFile(thumbnail, 'thumbnail');
        if (!thumbnailUrl) return;
      }

      // 2. type 판별
      const type = mediaFile.type.startsWith('image') ? 'photo' : 'video';

      // 3. DB insert
      await addMedia(schoolId, departmentId, mediaUrl, type, category, thumbnailUrl);

      alert('사진/동영상이 성공적으로 추가되었습니다.');
      router.back();
    } catch (error) {
      console.error('미디어 추가 중 오류 발생:', error);
      alert('미디어 추가 중 오류가 발생했습니다.');
      return;
    }
  };

  return (
    <section className="relative bg-white w-full p-4 md:p-10 border border-gray-200 rounded-xl shadow-dropdown md:w-[1080px] md:min-h-[753px]">
      <header className="relative flex flex-col justify-start gap-1">
        <ol className="flex justify-start items-center">
          <li>
            <Badge active>사진 / 동영상 추가</Badge>
          </li>
        </ol>
        <h3 className="text-24 text-gray-900 font-semibold">사진 / 동영상 추가</h3>
        <div className="absolute right-0 bottom-0 flex items-center gap-2">
          <Button
            className="text-white bg-primary-700 rounded-lg px-3 py-1.5"
            onClick={handleAddMedia}
          >
            추가하기
          </Button>
        </div>
      </header>
      <span className="inline-block w-full h-px bg-gray-200 my-8" aria-hidden="true"></span>
      <form className="flex flex-col gap-6">
        {/* 카테고리 선택 */}
        <div className="flex justify-start items-center w-full">
          <label
            htmlFor="category"
            className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
          >
            카테고리
            <Asterisk className="text-red w-4 h-4" />
          </label>
          <div className="flex-1 min-w-0">
            <select
              id="category"
              className="w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 사진/동영상 업로드 */}
        <div className="flex justify-start items-start">
          <label
            htmlFor="media-upload"
            className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
          >
            사진/동영상 업로드
            <Asterisk className="text-red w-4 h-4" />
          </label>
          <div className="flex-1 min-w-0">
            <FileInput
              id="media-upload"
              size="lg"
              multiple={false}
              onChange={(files) => {
                if (!files) return;
                const file = files instanceof FileList ? files[0] : files;
                setMediaFile(file);
              }}
            />
          </div>
        </div>

        {/* 동영상 썸네일 (video일 경우만 보이게) */}
        {mediaFile && mediaFile.type.startsWith('video') && (
          <div className="flex justify-start items-start">
            <label
              htmlFor="thumbnail-upload"
              className="shrink-0 flex justify-start items-center gap-0.5 text-16 text-gray-800 w-[100px] md:text-18 md:w-[200px]"
            >
              동영상 썸네일 이미지
            </label>
            <div className="flex-1 min-w-0">
              <FileInput
                id="thumbnail-upload"
                size="lg"
                multiple={false}
                onChange={(files) => {
                  if (!files) return;
                  const file = files instanceof FileList ? files[0] : files;
                  setThumbnail(file);
                }}
              />
            </div>
          </div>
        )}
      </form>
    </section>
  );
}
