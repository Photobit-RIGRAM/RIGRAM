import TopTab from '@/components/tab/top';

export default function GraduateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex justify-end items-center">
        <TopTab />
      </div>

      <main className="flex justify-center items-center flex-1 mx-auto w-full max-w-[1080px]">
        {children}
      </main>
    </div>
  );
}
