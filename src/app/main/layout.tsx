import Header from '@/components/header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="px-5 py-5 md:px-0 md:py-0 flex justify-center items-center flex-1">
        {children}
      </main>
    </div>
  );
}
