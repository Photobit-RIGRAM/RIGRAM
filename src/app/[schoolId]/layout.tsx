import Header from '@/components/header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <Header hasSchool />
      <main className="flex justify-center items-center flex-1 px-5 pt-5 pb-14 md:px-10 md:pb-17">
        {children}
      </main>
    </div>
  );
}
