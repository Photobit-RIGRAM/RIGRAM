import TopTab from '@/components/tab/top';

export default function DepartmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-8 w-full h-full md:px-10">
      <header className="flex justify-center md:justify-end items-center mt-4">
        <TopTab />
      </header>
      <main className="md:max-w-[1080px] w-full h-full m-auto">{children}</main>
    </div>
  );
}
