import Image from "next/image";
import Link from "next/link";
import SelectTheme from "../theme/selectTheme";

export default function Navbar() {
  return (
    <nav
      className={`border-b border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200 dark:shadow-md dark:shadow-slate-900 sticky top-0 z-30 bg-white dark:bg-slate-900`}
    >
      <div className="container mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold italic text-gray-900 dark:text-white"
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            width={10}
            height={10}
            className="w-auto h-16 rounded-full"
          />
        </Link>

        <div className="flex items-center space-x-1 sm:space-x-2">
          <SelectTheme />
        </div>
      </div>
    </nav>
  );
}
