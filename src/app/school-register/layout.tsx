import Header from '@/components/header';

export default function SchoolRegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <Header />
      <main className="flex justify-center items-start flex-1 px-5 pt-5 pb-14 md:items-center md:px-10 md:pt-10 md:pb-17">
        {children}
      </main>
    </div>
  );
}
