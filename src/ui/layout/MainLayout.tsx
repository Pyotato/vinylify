import { ReactNode } from 'react';

function MainLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <section className="text-(--color-white) bg-(--grey-500) p-5 inline-flex flex-col gap-3 w-full h-full">
      {children}
    </section>
  );
}

export default MainLayout;
