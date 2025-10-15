'use client';

import type { Media } from '@/types/media';
import { X } from 'lucide-react';
import Image from 'next/image';

interface OverlayViewerProps {
  media: Media | null;
  onClose: () => void;
}

export default function OverlayViewer({ media, onClose }: OverlayViewerProps) {
  if (!media) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <button
        className="absolute top-5 right-5 text-white bg-black/50 rounded-full p-2 hover:bg-black"
        onClick={onClose}
      >
        <X size={24} aria-hidden="true" />
      </button>

      {media.type === 'video' ? (
        <video
          controls
          autoPlay
          className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-lg"
          poster={media.video_thumbnail || undefined}
        >
          <source src={media.url} type="video/mp4" />
        </video>
      ) : (
        <div className="relative w-[90vw] h-[80vh] rounded-lg shadow-lg">
          <Image
            src={media.url}
            alt={'미디어 이미지'}
            className="object-contain"
            fill
            sizes="(max-width: 768px) 90vw, 80vh"
          />
        </div>
      )}
    </div>
  );
}
