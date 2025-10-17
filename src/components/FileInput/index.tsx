'use client';

import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface FileInputProps {
  id?: string;
  name?: string;
  accept?: string;
  multiple?: boolean;
  onChange?: (files: FileList | File | null) => void;
  className?: string;
  size?: 'sm' | 'lg';
}

export default function FileInput({
  id = 'fileInput',
  name = 'fileInput',
  accept = 'image/*, video/*',
  multiple = false,
  onChange,
  className,
  size = 'sm',
}: FileInputProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(
        multiple ? `${files[0].name}외 ${files.length - 1}개 파일 선택됨` : files[0].name
      );

      if (files[0].type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(files[0]);
        setPreviewUrl(imageUrl);
      } else {
        setPreviewUrl(null);
      }
      onChange?.(multiple ? files : files[0]);
    } else {
      setFileName(null);
      setPreviewUrl(null);
      onChange?.(files);
    }
  };

  return (
    <div className={`${className || ''}`}>
      <label
        htmlFor={id}
        className="flex justify-start items-center gap-4 w-full p-3 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <div
          className={`relative flex justify-center items-center bg-primary-100 p-5 rounded-lg ${size === 'sm' ? '' : 'w-34 h-40'}`}
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="미리보기"
              fill
              sizes="(max-width: 768px) 10px 10px"
              className="object-cover w-full h-full rounded-lg"
            />
          ) : (
            <ImageIcon className="w-6 h-6 text-gray-500" />
          )}
        </div>
        <div>
          {fileName ? (
            <p className="text-16 text-gray-600">{fileName}</p>
          ) : (
            <>
              <p className="text-16 text-gray-600">여기를 클릭하거나 이미지를 올려주세요</p>
              <p className="text-14 text-gray-500">파일 형식은 SVG 또는 PNG로 업로드해 주세요</p>
            </>
          )}
        </div>
      </label>
      <input
        id={id}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
