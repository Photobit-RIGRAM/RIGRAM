import type { Student } from '@/types/student';

interface ProfileProps extends Student {
  onClick: () => void;
}

export default function Profile({
  id,
  school_id,
  dept_id,
  name,
  name_en,
  graduation_year,
  profile_default,
  profile_graduate,
  created_at,
  updated_at,
  onClick,
}: ProfileProps) {
  return (
    <div
      className="flex flex-col gap-4 p-4 bg-white border border-border rounded-xl"
      onClick={onClick}
    >
      <div className="flex gap-3 justify-center items-center w-full overflow-hidden">
        <img
          src={profile_default}
          alt={`${name}의 증명사진`}
          className="w-1/2 h-35 rounded-sm object-cover"
        />
        <img
          src={profile_graduate}
          alt={`${name}의 졸업사진`}
          className="w-1/2 h-35 rounded-sm object-cover"
        />
      </div>
      <span className="text-18 text-gray-900 font-semibold">{name}</span>
    </div>
  );
}
