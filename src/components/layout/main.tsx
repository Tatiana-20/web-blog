export default function Main({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex-1 px-2">
      <div className="bg-white dark:bg-slate-900 h-full rounded-xl shadow-md flex flex-col items-center py-4 px-2">
        {children}
      </div>
    </main>
  );
}
