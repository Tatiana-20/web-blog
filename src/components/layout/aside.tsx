"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Aside() {
  const { data: session, status } = useSession();

  return (
    <aside className="w-2/12 md:w-3/12 lg:w-1/4 px-2">
      <div className="bg-white dark:bg-slate-900 h-full rounded-xl shadow-md flex flex-col items-center py-4 px-2">
        {status === "loading" ? (
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-2"></div>
          </div>
        ) : status === "authenticated" ? (
          <div className="flex flex-col items-center mb-4">
            <Image
              src="/user.png"
              alt="User"
              width={100}
              height={100}
              className="w-24 h-24 rounded-full mb-2"
            />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {session?.user?.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {session?.user?.email}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center mb-4">
            <Image
              src="/logo.svg"
              alt="User"
              width={100}
              height={100}
              className="w-24 h-24 rounded-full mb-4"
            />
            <div className="flex flex-col items-center gap-2">
              <Link
                href="/auth/signin"
                className="cursor-pointer border border-slate-200 shadow-sm dark:border-0 bg-white dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 font-semibold py-2 px-4 rounded w-full"
              >
                Inicia sesión
              </Link>
              <span>o</span>
              <Link
                href="/auth/signup"
                className="cursor-pointer border border-slate-200 shadow-sm dark:border-0 bg-white dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 font-semibold py-2 px-4 rounded w-full"
              >
                Registrate
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
