'use client';

import Button from '@/components/button';
import OverlayViewer from '@/components/overlayViewer';
import BottomTab from '@/components/tab/bottom';
import { useMediaStore } from '@/store/useMediaStore';
import { ImageMinus, ImagePlus, Images, Play, Trash } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PhotoListPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const currentDept = segments[2];
  const currentTab = searchParams.get('tab') || 'all';
  const mediaList = useMediaStore((state) => state.mediaList);
  const fetchMediaList = useMediaStore((state) => state.fetchMediaList);
  const deleteMedia = useMediaStore((state) => state.deleteMedia);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedMediaIds, setSelectedMediaIds] = useState<string[]>([]);

  const RENDER_MEDIA =
    currentTab === 'all' ? mediaList : mediaList.filter((item) => item.category === currentTab);

  useEffect(() => {
    fetchMediaList(currentDept);
  }, [currentDept, fetchMediaList]);

  // 🗑️ 삭제 버튼 동작
  const handleDeleteButton = async () => {
    if (!isDeleteMode) {
      setIsDeleteMode(true);
      return;
    }

    if (selectedMediaIds.length === 0) {
      alert('삭제할 사진 또는 동영상이 없습니다.');
      setIsDeleteMode(false);
      return;
    }

    if (!confirm(`${selectedMediaIds.length}개의 사진 또는 동영상을 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await Promise.all(selectedMediaIds.map((id) => deleteMedia(currentDept, id)));
      alert('삭제 완료');
      setSelectedMediaIds([]);
      setIsDeleteMode(false);
    } catch (error) {
      console.error('사진/동영상 삭제 중 오류:', error);
      alert('사진/동영상 삭제 중 오류가 발생했습니다.');
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedMediaIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <section className="relative flex flex-col gap-2 w-full h-full bg-white rounded-xl p-5 overflow-y-scroll scrollbar-hide md:p-6">
      {/* 헤더 */}
      <header className="relative flex justify-between items-center md:px-6 md:py-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-16 text-gray-900 font-semibold md:text-20">
            사진 - {currentTab === 'all' ? '전체' : currentTab}
          </h3>
          <span className="flex items-center gap-1 text-14 text-gray-700 font-medium md:text-16">
            <Images />
            {`이미지 ${RENDER_MEDIA.filter((i) => i?.type === 'photo').length}개, 동영상 ${RENDER_MEDIA.filter((i) => i?.type === 'video').length}개`}
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            className="bg-gray-800 text-white rounded-full p-1.5 md:p-2.5 hover:bg-gray-700"
            href={`${pathname}/add`}
          >
            <ImagePlus />
          </Button>
          <Button
            className="bg-gray-800 text-white rounded-full p-1.5 md:p-2.5 hover:bg-gray-700"
            onClick={handleDeleteButton}
          >
            {isDeleteMode ? <Trash /> : <ImageMinus />}
          </Button>
        </div>
      </header>

      {/* 미디어 그리드 */}
      <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-2 max-h-[500px] w-full">
        {RENDER_MEDIA.map((media, index) => {
          const isSelected = selectedMediaIds.includes(media?.id);

          return (
            <div
              key={media?.id ?? `media-${index}`}
              className={`relative flex justify-center items-center bg-[#eee] h-[200px] rounded-lg overflow-hidden hover:cursor-pointer
                ${
                  isDeleteMode
                    ? isSelected
                      ? 'ring-4 ring-red-500'
                      : 'hover:opacity-70'
                    : 'hover:scale-105 hover:opacity-70'
                }`}
              onClick={() => (isDeleteMode ? toggleSelect(media.id) : setSelectedMedia(media))}
            >
              {/* 미디어 (사진/영상) */}
              {media?.type === 'video' ? (
                <video preload="none" poster={media.video_thumbnail || '/default-thumbnail.jpg'}>
                  <source src={media?.url} type="video/mp4" />
                </video>
              ) : (
                <img src={media?.url} alt="" className="w-full h-full object-cover" />
              )}

              {/* ▶️ 비디오 아이콘 (삭제 모드 아닐 때만 표시) */}
              {media?.type === 'video' && !isDeleteMode && (
                <div className="absolute flex justify-center items-center w-[84px] h-[84px] bg-[#51515D] text-white opacity-60 rounded-full">
                  <Play />
                </div>
              )}

              {/* ✅ 삭제 모드일 때 체크박스 */}
              {isDeleteMode && (
                <div
                  className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'bg-red-500 border-red-500' : 'bg-white border-gray-400'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* 오버레이 뷰어 */}
      <OverlayViewer media={selectedMedia} onClose={() => setSelectedMedia(null)} />

      {/* 하단 탭 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 min-w-fit">
        <BottomTab purpose="organization" />
      </div>
    </section>
  );
}
