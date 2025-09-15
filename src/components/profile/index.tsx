import { STUDENT_DATA } from '@/mock/mockData';

export default function Profile() {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white border border-border rounded-xl">
      <div className="flex gap-3 justify-center items-center w-full overflow-hidden">
        <img
          src={STUDENT_DATA.photo_id}
          alt={`${STUDENT_DATA.name}의 증명사진`}
          className="w-1/2 h-35 rounded-sm object-cover"
        />
        <img
          src={STUDENT_DATA.photo_graduation}
          alt={`${STUDENT_DATA.name}의 졸업사진`}
          className="w-1/2 h-35 rounded-sm object-cover"
        />
      </div>
      <span className="text-18 text-gray-900 font-semibold">{STUDENT_DATA.name}</span>
    </div>
  );
}
