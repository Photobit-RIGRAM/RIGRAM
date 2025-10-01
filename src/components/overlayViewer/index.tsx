'use client';

import type { Media } from '@/types/media';
import { Play, X } from 'lucide-react';

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
        <X size={24} />
      </button>

      {media.type === 'video' ? (
        <video
          controls
          autoPlay
          className="max-w-[90%] max-h-[80%] rounded-lg shadow-lg"
          poster={media.video_thumbnail || undefined}
        >
          <source src={media.url} type="video/mp4" />
        </video>
      ) : (
        <img
          src={media.url}
          alt=""
          className="max-w-[90%] max-h-[80%] rounded-lg shadow-lg object-contain"
        />
      )}
    </div>
  );
}
