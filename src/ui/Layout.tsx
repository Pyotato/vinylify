import { ReactNode } from 'react';

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <section className="text-(--light-grey-200) bg-(--grey-500) p-[1.2rem]">
      {children}
    </section>
  );
}

export function MainLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <section className="text-(--color-white) bg-(--grey-500) p-5 inline-flex flex-col gap-3 w-full h-full">
      {children}
    </section>
  );
}

export function FullBackground({
  children,
  className = '',
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <div className="h-full w-full align-middle inline-flex justify-center bg-(--grey-100)">
      <div
        className={`w-full text-center align-middle inline-flex flex-col justify-center gap-4 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
